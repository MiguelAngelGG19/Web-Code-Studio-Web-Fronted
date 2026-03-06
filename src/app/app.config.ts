import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { PatientRepository } from './core/patient/domain/patient.repository';
import { PatientHttpRepository } from './core/patient/infraestructure/patient-http.repository';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: PatientRepository, useClass: PatientHttpRepository } 
  ]
};