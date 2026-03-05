import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../domain/patient.model';
import { PatientRepository } from '../domain/patient.repository';

@Injectable({
  providedIn: 'root'
})
export class PatientHttpRepository implements PatientRepository {
  // Conectamos a tu endpoint oficial [cite: 4, 9]
  private readonly apiUrl = 'http://localhost:3000/api/patients'; 

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }
}