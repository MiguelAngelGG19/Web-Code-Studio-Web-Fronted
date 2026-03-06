import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../domain/patient.model';
import { PatientRepository } from '../domain/patient.repository';

@Injectable({
  providedIn: 'root'
})
export class PatientUseCase {
  
  // Inyectamos el "Puerto" (la abstracción), no la implementación HTTP directa
  constructor(private patientRepository: PatientRepository) {}

  executeCreate(patient: Patient): Observable<Patient> {
    return this.patientRepository.createPatient(patient);
  }
  getPatients(): Observable<Patient[]> {
    return this.patientRepository.getAllPatients();
  }
}