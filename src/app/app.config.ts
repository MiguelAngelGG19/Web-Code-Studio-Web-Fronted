import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 1. Importar HttpClient
import { routes } from './app.routes';
import { PatientRepository } from './core/patient/domain/patient.repository';
import { PatientHttpRepository } from './core/patient/infraestructure/patient-http.repository';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // 2. Activar cliente HTTP
    // 3. Conectar el Puerto con el Adaptador
    provideAnimationsAsync(),// 4. activar animaciones de PrimeNG
    { provide: PatientRepository, useClass: PatientHttpRepository } 
  ]
};