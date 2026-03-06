import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,  // <-- si no lo tenía, agrégalo
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    ButtonModule,
    ChartModule
  ]
})
export class DashboardComponent {
  // Datos para el gráfico de barras (tráfico semanal)
  traficoSemanalData: any;
  traficoSemanalOptions: any;

  constructor() {
    // Mock de datos - reemplazar con servicio cuando la API esté lista
    this.traficoSemanalData = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      datasets: [
        {
          label: 'Citas',
          backgroundColor: '#42A5F5',
          data: [12, 15, 18, 20, 14, 8]
        }
      ]
    };

    this.traficoSemanalOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }

  // Métodos para acciones (se pueden conectar después)
  contactar(paciente: string): void {
    console.log('Contactar a', paciente);
  }
}