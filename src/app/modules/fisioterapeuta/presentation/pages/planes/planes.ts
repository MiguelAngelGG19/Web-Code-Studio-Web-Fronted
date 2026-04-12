import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.scss']
})
export class PlanesComponent {
  plataformas = [
    {
      nombre: 'Plan Básico',
      precio: '$200',
      periodo: '/mes',
      descripcion: 'Ideal para fisioterapeutas que comienzan a digitalizar su práctica.',
      beneficios: [
        'Hasta 30 pacientes activos',
        'Creación de rutinas personalizadas',
        'Acceso a biblioteca básica de ejercicios',
        'Seguimiento básico de pacientes'
      ],
      destacado: false,
      botonTexto: 'Empezar Básico'
    },
    {
      nombre: 'Plan Ilimitado',
      precio: '$300',
      periodo: '/mes',
      descripcion: 'La solución completa para clínicas y profesionales de alto rendimiento.',
      beneficios: [
        'Pacientes ilimitados',
        'Agendas, rutinas y reportes ilimitados',
        'Estadísticas avanzadas del dashboard',
        'Soporte prioritario 24/7'
      ],
      destacado: true,
      botonTexto: 'Adquirir Ilimitado'
    }
  ];

  suscribir(planNombre: string) {
    // Aquí podemos disparar la integración real con Stripe/PayPal.
    alert(`Has seleccionado el ${planNombre}. Pronto te redirigiremos a la pasarela de pago segura.`);
  }
}
