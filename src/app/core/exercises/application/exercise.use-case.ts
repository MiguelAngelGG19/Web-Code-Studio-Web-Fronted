import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, CreateExerciseDTO } from '../domain/exercise.model';
import { ExerciseRepository } from '../domain/exercise.repository';

@Injectable({ providedIn: 'root' })
export class ExerciseUseCase {
    constructor(private repository: ExerciseRepository) {}

  listExercises(page: number = 1): Observable<{ rows: Exercise[], count: number }> {
    return this.repository.getAll(page, 10); // Ejemplo: 10 por página
  }

  addExercise(data: CreateExerciseDTO): Observable<any> {
    return this.repository.create(data);
  }
}