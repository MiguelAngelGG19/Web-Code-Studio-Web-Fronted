import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <--- INDISPENSABLE
import { Patient, PatientApiResponse } from '../domain/patient.model';
import { PatientRepository } from '../domain/patient.repository';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientHttpRepository implements PatientRepository {
  private readonly apiUrl = `${environment.webservice.baseUrl}/api/patients`; 

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    // 1. Especificamos que el GET recibe el objeto completo de la API
    return this.http.get<PatientApiResponse>(this.apiUrl).pipe(
      // 2. Extraemos solo la propiedad 'rows' que contiene la lista
      map((response: PatientApiResponse) => response.rows)
    );
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }
  updatePatient(id: number, patient: any): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }
}