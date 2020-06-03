import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const PATIENT_API = 'http://localhost:9090/api/patients/';
const MI_PATIENT_API = 'http://localhost:9090/api/mi/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  createPatient(patient: Object): Observable<Object> {
    return this.http.post(PATIENT_API, patient);
  }

  getPatientsList(): Observable<any> {
    return this.http.get(PATIENT_API, httpOptions);
  }

  getPatientsListOfMedicalInstitute(id:number): Observable<any> {
    return this.http.get(MI_PATIENT_API + id + "/patients/", httpOptions);
  }
}