import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';

import { PatientUseCase } from '../../../../../core/patient/application/patient.use-case';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, 
    ButtonModule, InputTextModule, DialogModule, 
    ToastModule, KeyFilterModule
  ],
  providers: [MessageService],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  displayEditModal: boolean = false;
  pacienteEditando: any = {};
  pacienteOriginal: any = {}

  regexLetras: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  constructor(
    private messageService: MessageService,
    private patientUseCase: PatientUseCase,
    private cdr: ChangeDetectorRef // 2. Lo inyectamos aquí
  ) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.patientUseCase.getPatients().subscribe({
      next: (respuestaBackend: any) => {
        const listaPacientes = respuestaBackend.rows || [];

        this.patients = listaPacientes.map((p: any) => {
          const apellidoM = p.lastNameM ? ` ${p.lastNameM}` : '';
          const fullName = `${p.firstName} ${p.lastNameP}${apellidoM}`;
          
          return {
            id: p.id,
            name: fullName,
            first_name: p.firstName,
            last_name_p: p.lastNameP,
            last_name_m: p.lastNameM || '',
            email: p.email,
            birth_year: p.birthYear,
            height: p.height,
            weight: p.weight,
            avatar: `https://ui-avatars.com/api/?name=${p.firstName}+${p.lastNameP}&background=0D8B97&color=fff&rounded=true`,
            statusDot: 'bg-green-500' 
          };
        });

        // 3. Forzamos a la pantalla a dibujarse
        this.cdr.detectChanges(); 
        console.log('✅ Arreglo final guardado en this.patients:', this.patients);
      },
      error: (err: any) => {
        console.error('❌ Error al cargar pacientes:', err);
        this.messageService.add({ severity: 'error', summary: 'Error de conexión', detail: 'No se pudieron cargar los pacientes desde el servidor.' });
      }
    });
  }

  verDetallePaciente(id: number) {
    console.log('Navegando al expediente del paciente con ID:', id);
  }

  abrirModalEditar(patient: any) {
    this.pacienteEditando = { ...patient };
    this.pacienteOriginal = { ...patient };
    this.displayEditModal = true;
  }

  cerrarModal() {
    this.displayEditModal = false;
  }

  guardarCambios() {
    this.messageService.clear();
    const p = this.pacienteEditando;
    const orig = this.pacienteOriginal;

    // --- INICIO DEL DIRTY CHECK ---
    // Verificamos si absolutamente todos los campos son idénticos a la copia original
    const sinCambios = (
      p.first_name === orig.first_name &&
      p.last_name_p === orig.last_name_p &&
      p.last_name_m === orig.last_name_m &&
      p.email === orig.email &&
      Number(p.birth_year) === Number(orig.birth_year) &&
      Number(p.height) === Number(orig.height) &&
      Number(p.weight) === Number(orig.weight)
    );

    if (sinCambios) {
      // Si todo está idéntico, cerramos el modal y avisamos sin molestar al backend
      this.messageService.add({ 
        severity: 'info', 
        summary: 'Sin modificaciones', 
        detail: 'No se detectaron cambios en la información del paciente.' 
      });
      this.displayEditModal = false;
      return; // Detenemos la ejecución aquí
    }
    // --- FIN DEL DIRTY CHECK ---

    if (!p.first_name || !p.last_name_p || !p.email || !p.birth_year || !p.height || !p.weight) {
      this.messageService.add({ severity: 'warn', summary: 'Campos incompletos', detail: 'Por favor, llena todos los campos obligatorios.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(p.email)) {
      this.messageService.add({ severity: 'warn', summary: 'Correo inválido', detail: 'Por favor, proporciona un correo electrónico válido.' });
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYearNum = Number(p.birth_year);
    if (birthYearNum < 1900 || birthYearNum > currentYear) {
      this.messageService.add({ severity: 'warn', summary: 'Año incorrecto', detail: `El año de nacimiento debe estar entre 1900 y ${currentYear}.` });
      return;
    }

    const alturaNum = Number(p.height);
    if (alturaNum < 0.40 || alturaNum > 2.50) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa la estatura', detail: 'La estatura debe estar en metros (ej. 1.75). Asegúrate de usar el punto decimal.' });
      return;
    }

    const pesoNum = Number(p.weight);
    if (pesoNum <= 0 || pesoNum > 700) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa el peso', detail: 'El peso debe ser mayor a 0 y menor a 700 Kg. Revisa tus decimales.' });
      return;
    }

    const payloadParaBackend = {
      firstName: p.first_name,
      lastNameP: p.last_name_p,
      lastNameM: p.last_name_m ? p.last_name_m : undefined, 
      email: p.email,
      birthYear: birthYearNum,
      height: alturaNum,
      weight: pesoNum
    };

    this.patientUseCase.executeUpdate(p.id, payloadParaBackend as any).subscribe({
      next: (respuesta: any) => {
        this.messageService.add({ severity: 'success', summary: '¡Actualizado!', detail: 'Paciente modificado correctamente.' });
        this.cargarPacientes();
        this.displayEditModal = false;
      },
      error: (err: any) => {
        const mensajeBackend = err.error?.message || err.error?.error || 'Ocurrió un problema al guardar en el servidor.';
        this.messageService.add({ severity: 'error', summary: 'Error del Servidor', detail: mensajeBackend });
      }
    });
  }
}