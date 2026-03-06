import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
// 1. Importamos los módulos para la ventana flotante
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PatientUseCase } from '../../../../../core/patient/application/patient.use-case';
import { Patient } from '../../../../../core/patient/domain/patient.model';

@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule,
    ButtonModule, InputTextModule, DropdownModule, 
    InputNumberModule, KeyFilterModule,
    ToastModule // 2. Lo agregamos a los imports
  ],
  providers: [MessageService], // 3. ¡Súper importante para que funcione el Toast!
  templateUrl: './patient-create.html'
})
export class PatientCreateComponent implements OnInit {
  generos: any[] | undefined;

  regexLetras: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  regexEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  nuevoPaciente: Patient = {
    physiotherapist_id: 1, 
    first_name: '',
    last_name_p: '',
    last_name_m: '',
    birth_year: undefined,
    sex: '',
    height: undefined,
    weight: undefined,
    email: ''
  };

  constructor(
    private patientUseCase: PatientUseCase,
    private router: Router,
    private messageService: MessageService // 4. Lo inyectamos aquí
  ) {}

  ngOnInit() {
    this.generos = [
      { label: 'Hombre', value: 'M' },
      { label: 'Mujer', value: 'F' }
    ];
  }

  private limpiarTexto(texto: string | undefined): string {
    if (!texto) return '';
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  guardarPaciente() {
    // ¡LA MAGIA AQUÍ! Limpiamos cualquier alerta anterior en cuanto se presiona el botón
    this.messageService.clear();

    if (!this.nuevoPaciente.first_name || !this.nuevoPaciente.last_name_p) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El nombre y apellido paterno son obligatorios.' });
      return;
    }

    if (!this.regexLetras.test(this.nuevoPaciente.first_name) || !this.regexLetras.test(this.nuevoPaciente.last_name_p)) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El nombre y apellido paterno solo pueden contener letras.' });
      return;
    }

    if (this.nuevoPaciente.last_name_m && !this.regexLetras.test(this.nuevoPaciente.last_name_m)) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El apellido materno solo puede contener letras.' });
      return;
    }

    if (!this.nuevoPaciente.birth_year || !this.nuevoPaciente.sex || !this.nuevoPaciente.height || !this.nuevoPaciente.weight || !this.nuevoPaciente.email) {
       this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Por favor, llena TODOS los campos.' });
       return;
    }

    const payloadParaBackend = {
      firstName: this.limpiarTexto(this.nuevoPaciente.first_name),
      lastNameP: this.limpiarTexto(this.nuevoPaciente.last_name_p),
      lastNameM: this.nuevoPaciente.last_name_m ? this.limpiarTexto(this.nuevoPaciente.last_name_m) : undefined,
      birthYear: this.nuevoPaciente.birth_year,
      sex: this.nuevoPaciente.sex,
      height: this.nuevoPaciente.height,
      weight: this.nuevoPaciente.weight,
      email: this.nuevoPaciente.email.toLowerCase().trim(),
      physiotherapistId: 1 
    };

    this.patientUseCase.executeCreate(payloadParaBackend as any).subscribe({
      next: (respuesta: any) => {
        // Limpiamos de nuevo por si acaso antes del éxito
        this.messageService.clear(); 
        this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Paciente registrado correctamente.' });
        
        setTimeout(() => {
          this.router.navigate(['/dashboard/pacientes']);
        }, 1500);
      },
      error: (err: any) => {
        // Limpiamos las notificaciones anteriores para que no se apilen errores del backend
        this.messageService.clear(); 
        
        const mensajeBackend = err.error?.message || 'Error de validación.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: mensajeBackend });
      }
    });
  }
}