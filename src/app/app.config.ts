import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 1. Importar HttpClient
import { routes } from './app.routes';
import { PatientRepository } from './features/fisioterapeuta/domain/repositories/patient.repository';
import { PatientHttpRepository } from './features/fisioterapeuta/infraestructure/repositories/patient-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // 2. Activar cliente HTTP
    // 3. Conectar el Puerto con el Adaptador
    { provide: PatientRepository, useClass: PatientHttpRepository } 
  ]
};