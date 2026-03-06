import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // *** CAMBIO CLAVE: Importar ChangeDetectorRef ***
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { ExerciseUseCase } from '../../core/exercises/application/exercise.use-case';
import { Exercise } from '../../core/exercises/domain/exercise.model';
import { PatientUseCase } from  '../../core/patient/application/patient.use-case';

@Component({
  selector: 'app-banco-ejercicios',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, DialogModule, ListboxModule],
  templateUrl: './banco-ejercicios.html',
  styleUrl: './banco-ejercicios.scss'
})
export class BancoEjerciciosComponent implements OnInit {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  selectedCategory: string = 'Todos';

  categories = [
    { label: 'Todos', muscles: [] },
    { label: 'Tren Superior', muscles: ['hombro', 'espalda', 'brazo', 'pecho', 'cervical', 'dorsal', 'escapula', 'manguito rotador'] },
    { label: 'Tren Inferior', muscles: ['cadera', 'rodilla', 'tobillo', 'gluteo', 'pierna', 'pie', 'pisada'] },
    { label: 'Núcleo (Core)', muscles: ['core', 'abdomen', 'lumbar', 'columna', 'pelvis'] }
  ];

  patients: any[] = [];
  showAssignModal: boolean = false;
  selectedExercise?: Exercise;
  selectedPatient?: any;

  placeholderImg = 'https://placehold.co/600x400/0d9488/ffffff?text=ACTIVA+Fisio';

  constructor(
    private exerciseUseCase: ExerciseUseCase,
    private patientUseCase: PatientUseCase,
    private cd: ChangeDetectorRef // *** CAMBIO CLAVE: Inyectar ChangeDetectorRef ***
  ) {}

  ngOnInit(): void {
    this.loadExercises();
    this.loadPatients();
  }

  loadExercises(): void {
    this.loading = true;
    this.exerciseUseCase.listExercises(1, 100).subscribe({
      next: (result) => {
        // *** CAMBIO CLAVE: Asignar datos ***
        this.exercises = result.rows;
        this.filteredExercises = [...this.exercises]; // Asegurar que sea una copia nueva
        this.loading = false;
        
        // *** CAMBIO CLAVE MÁS IMPORTANTE: Forzar detección de cambios ***
        // Esto obliga a Angular a renderizar el *ngFor INMEDIATAMENTE
        this.cd.detectChanges(); 
        
        console.log('Ejercicios cargados e inicializados:', this.filteredExercises.length);
      },
      error: (err) => {
        console.error('Error al cargar ejercicios:', err);
        this.loading = false;
        this.cd.detectChanges(); // También forzar cambios en caso de error
      }
    });
  }

  loadPatients(): void {
    this.patientUseCase.getPatients().subscribe({
      next: (response: any) => {
        this.patients = response.rows || [];
        this.cd.detectChanges(); // Forzar cambios al cargar pacientes
      }
    });
  }

  filterByZone(category: any): void {
    this.selectedCategory = category.label;
    this.searchTerm = '';
    
    if (category.label === 'Todos') {
      this.filteredExercises = [...this.exercises];
    } else {
      this.filteredExercises = this.exercises.filter(ex => {
        const zone = this.normalizeText(ex.bodyZone || '');
        return category.muscles.some((m: string) => zone.includes(this.normalizeText(m)));
      });
    }
    this.cd.detectChanges(); // Forzar cambios después de filtrar
  }

  onSearch(): void {
    this.selectedCategory = 'Todos';
    const term = this.normalizeText(this.searchTerm);
    if (!term) {
      this.filteredExercises = [...this.exercises];
      this.cd.detectChanges();
      return;
    }
    this.filteredExercises = this.exercises.filter(ex => 
      this.normalizeText(ex.name).includes(term) || 
      this.normalizeText(ex.bodyZone || '').includes(term)
    );
    this.cd.detectChanges(); // Forzar cambios después de buscar
  }

  private normalizeText(text: string): string {
    return text ? text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : '';
  }

  openAssignModal(exercise: Exercise): void {
    this.selectedExercise = exercise;
    this.showAssignModal = true;
    this.cd.detectChanges();
  }

  confirmAssignment(): void {
    if (this.selectedPatient && this.selectedExercise) {
      // Aquí iría tu lógica de guardado real
      console.log('Asignado con éxito');
      this.showAssignModal = false;
      this.selectedPatient = null;
      this.cd.detectChanges();
    }
  }
}