import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms'; // Necesario para los inputs

@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ButtonModule, 
    InputTextModule, 
    DropdownModule, 
    InputTextareaModule, 
    CalendarModule
  ],
  templateUrl: './patient-create.html'
})
export class PatientCreateComponent implements OnInit {
  // Variables para los selectores
  generos: any[] | undefined;
  estados: any[] | undefined;

  ngOnInit() {
    this.generos = [
      { label: 'Masculino', value: 'M' },
      { label: 'Femenino', value: 'F' },
      { label: 'Otro', value: 'O' }
    ];

    this.estados = [
      { label: 'Nueva Consulta', value: 'nueva' },
      { label: 'Post-Operatorio', value: 'post' },
      { label: 'Crónico', value: 'cronico' }
    ];
  }
}