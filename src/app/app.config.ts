import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { PatientRepository } from './core/patient/domain/patient.repository';
import { PatientHttpRepository } from './core/patient/infraestructure/patient-http.repository';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ExerciseRepository } from './core/exercises/domain/exercise.repository';
import { ExerciseHttpRepository } from './core/exercises/infraestructure/exercise-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: PatientRepository, useClass: PatientHttpRepository },
    { provide: ExerciseRepository, useClass: ExerciseHttpRepository },
  ]
};