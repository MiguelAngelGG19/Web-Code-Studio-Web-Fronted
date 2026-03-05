import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; 

@Component({
  selector: 'app-banco-ejercicios',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule],
  templateUrl: './banco-ejercicios.html',
  styleUrl: './banco-ejercicios.scss'
})
export class BancoEjerciciosComponent {
  // Lógica futura para la pantalla
}