import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../domain/models/patient.model';
import { PatientRepository } from '../../domain/repositories/patient.repository';

@Injectable({
  providedIn: 'root'
})
export class PatientUseCase {
  
  // Inyectamos el "Puerto" (la abstracción), no la implementación HTTP directa
  constructor(private patientRepository: PatientRepository) {}

  getPatients(): Observable<Patient[]> {
    return this.patientRepository.getAllPatients();
  }

  addPatient(patient: Patient): Observable<Patient> {
    // Aquí podríamos agregar lógica extra antes de enviar al backend
    return this.patientRepository.createPatient(patient);
  }
}