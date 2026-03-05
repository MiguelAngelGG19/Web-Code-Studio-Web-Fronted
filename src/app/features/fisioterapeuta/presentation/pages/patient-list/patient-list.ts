import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule],
  templateUrl: './patient-list.html'
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  ngOnInit() {
    this.patients = [
      {
        id: 1,
        name: 'Sarah Jenkins',
        phone: '+1 (555) 019-2834',
        tag: 'POST-OPERATORIO',
        tagClass: 'bg-orange-100 text-orange-500',
        dateIcon: 'pi pi-calendar',
        dateText: 'Próxima: Hoy, 2:00 PM',
        motivo: 'Dolor de Hombro',
        motivoColor: 'text-red-500',
        diagnostico: 'Manguito Rotador',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'Paciente reporta dolor reducido (3/10) durante movimientos por encima de l...',
        avatar: 'https://i.pravatar.cc/150?img=47',
        statusDot: 'bg-green-500'
      },
      {
        id: 2,
        name: 'Michael Chen',
        phone: '+1 (555) 987-6543',
        tag: 'CRÓNICO',
        tagClass: 'bg-teal-100 text-teal-600',
        dateIcon: 'pi pi-calendar-times',
        dateText: 'Visto por última vez: hace 2 días',
        motivo: 'Inestabilidad...',
        motivoColor: 'text-color',
        diagnostico: 'Rehabilitació...',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'La hinchazón ha disminuido significativamente. Comenzó ejercici...',
        avatar: 'https://i.pravatar.cc/150?img=11',
        statusDot: 'bg-gray-400'
      },
      {
        id: 3,
        name: 'Emma Thomas',
        phone: '+1 (555) 246-8101',
        tag: 'NUEVA',
        tagClass: 'bg-green-100 text-green-600',
        dateIcon: 'pi pi-calendar',
        dateText: 'Próxima: Mañana, 10:00 AM',
        motivo: 'Espalda Baja',
        motivoColor: 'text-color',
        diagnostico: 'Distensión L...',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'Dolor agudo después de levantar objeto pesado. Flexión hacia adelant...',
        avatar: 'https://i.pravatar.cc/150?img=5',
        statusDot: 'bg-green-500'
      }
    ];
  }
}