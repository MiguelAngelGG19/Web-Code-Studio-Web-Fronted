import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importamos las herramientas de PrimeNG que pide tu HTML
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-completar-perfi',
  standalone: true, // Aseguramos que sea Standalone
  imports: [
    CommonModule,        // Para directivas básicas (ngIf, ngFor)
    ReactiveFormsModule, // ¡Vital para que el [formGroup] funcione!
    CalendarModule,      // Para que reconozca <p-calendar>
    ButtonModule         // Para que reconozca <p-button>
  ],
  templateUrl: './completar-perfi.html',
  styleUrl: './completar-perfi.scss',
})
export class CompletarPerfilComponent implements OnInit {
  perfilForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Encapsulamos la creación del formulario (Más limpio)
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
    if (this.perfilForm.valid) {
      console.log('Datos listos para el Core:', this.perfilForm.value);
      // Aquí es donde la UI le pasará la pelota al "Use Case" en el Core
    } else {
      // Marcamos los campos como "tocados" para que el usuario vea los errores
      Object.values(this.perfilForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}