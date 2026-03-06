import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExerciseUseCase } from '../../../core/exercises/application/exercise.use-case';
import { Exercise } from '../../../core/exercises/domain/exercise.model';

@Component({
  selector: 'app-listado-ejercicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-ejercicios.html',
  styleUrl: './listado-ejercicios.scss',
})
export class ListadoEjercicios implements OnInit {
  exercises: Exercise[] = [];
  loading = false;
  errorMessage = '';
  
  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  constructor(private exerciseUseCase: ExerciseUseCase) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.errorMessage = '';

    const offset = (this.currentPage - 1) * this.pageSize;

    this.exerciseUseCase.listExercises(this.pageSize, offset).subscribe({
      next: (result: any) => {
        this.exercises = result.rows;
        this.totalCount = result.count;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Error al cargar los ejercicios';
        console.error('Error:', err);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadExercises();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadExercises();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadExercises();
    }
  }
}
