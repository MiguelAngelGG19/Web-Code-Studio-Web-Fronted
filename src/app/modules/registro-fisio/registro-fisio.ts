import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

// 1. Importamos el Router para cambiar de página y el Toast para la alerta
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export interface PerfilProfesional {
  nombres: string;
  apellidos: string;
  cedula: string;
  curp: string;
  fechaNacimiento: Date;
}

@Component({
  selector: 'app-registro-fisio',
  standalone: true, 
  imports: [
    CommonModule,        
    ReactiveFormsModule, 
    CalendarModule,      
    ButtonModule,
    ToastModule // 2. Agregamos el ToastModule
  ],
  providers: [MessageService], // 3. Proveedor vital para que la alerta funcione
  templateUrl: './registro-fisio.html',
  styleUrl: './registro-fisio.scss',
})
export class RegistroFisioComponent implements OnInit {
  perfilForm!: FormGroup;

  // 4. Inyectamos Router y MessageService en el constructor
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.perfilForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      curp: ['', Validators.required],
      fechaNacimiento: [null, Validators.required]
    });
  }

  onSubmit() {
    // Limpiamos alertas previas
    this.messageService.clear();

    if (this.perfilForm.valid) {
      console.log('Datos listos para el Core:', this.perfilForm.value);
      
      // 5. Lanzamos la alerta de éxito
      this.messageService.add({ severity: 'success', summary: '¡Excelente!', detail: 'Perfil completado correctamente.' });

      // 6. Esperamos 1.5 segundos y navegamos al siguiente paso del flujo
      setTimeout(() => {
        // Redirige a la ruta temporal 'verificar-datos'
        this.router.navigate(['/verificar-datos']); 
      }, 1500);

    } else {
      // Si el formulario es inválido, lanzamos una alerta de error
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos requeridos.' });
      
      Object.values(this.perfilForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}