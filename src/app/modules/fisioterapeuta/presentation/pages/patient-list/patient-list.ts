import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatientHttpRepository } from '../../../../../core/patient/infraestructure/patient-http.repository';
import { Patient } from '../../../../../core/patient/domain/patient.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, InputTextModule],
  templateUrl: './patient-list.html'
})
export class PatientListComponent implements OnInit {
  // Tu arreglo mantiene el mismo formato
  patients: any[] = [];

  // Inyectamos tu servicio real
  private patientRepo = inject(PatientHttpRepository);

  ngOnInit() {
    this.cargarPacientesReales();
  }

  cargarPacientesReales() {
    this.patientRepo.getAllPatients().subscribe({
      next: (datosReales: Patient[]) => {
        // Mapeamos (transformamos) la información del backend a las variables que usa tu HTML
        this.patients = datosReales.map((dbPatient, index) => {
          
          // Un pequeño arreglo para alternar tus fotos y colores de estado 
          // dependiendo de la posición del paciente en la lista
          const avatares = [
            'https://i.pravatar.cc/150?img=47', 
            'https://i.pravatar.cc/150?img=11', 
            'https://i.pravatar.cc/150?img=5'
          ];
          const coloresEstado = ['bg-green-500', 'bg-gray-400', 'bg-orange-500'];

          return {
            id: dbPatient.idPaciente,
            
            // 1. DATOS REALES DE TU API
            // Unimos los nombres del backend en la variable "name" que espera tu HTML
            name: `${dbPatient.first_name} ${dbPatient.last_name_p} ${dbPatient.last_name_m || ''}`.trim(),
            
            // Usamos la variable "phone" de tu HTML, pero le metemos el email de la BD 
            // (o un texto por defecto si no tiene)
            phone: dbPatient.email || 'Sin información de contacto',

            // 2. DATOS DE DISEÑO (Para que tus tarjetas se sigan viendo geniales)
            tag: 'NUEVA',
            tagClass: 'bg-green-100 text-green-600',
            dateIcon: 'pi pi-calendar',
            dateText: 'Consulta de valoración',
            motivo: 'Evaluación general',
            motivoColor: 'text-color',
            diagnostico: 'Pendiente',
            diagnosticoColor: 'text-activa-primary',
            notaSOAP: 'Paciente ingresado desde el sistema central. Pendiente de evaluación...',
            
            // Asignamos una imagen y un color diferente usando el índice
            avatar: avatares[index % 3], 
            statusDot: coloresEstado[index % 3]
          };
        });
      },
      error: (err: any) => {
        console.error('Hubo un error al conectar con la base de datos', err);
      }
    });
  }
}