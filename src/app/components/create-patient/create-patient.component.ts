import { Component, OnInit } from '@angular/core';
import { Patient, PatientStatus } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patient: Patient = new Patient();
  submitted = false;
  patientStatuses: any = ['SUSPECTED', 'POSITIVE', 'NEGATIVE', 'RECOVERED', 'DEAD']
  genderTypes: any = ['MALE', 'FEMALE']
  districts: Observable<any>
  medicalInstitute : any;

  constructor(private patientService: PatientService,
    private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if(this.tokenStorage.getUser()){
      this.medicalInstitute = this.tokenStorage.getUser().medicalInstitute;
    }
    this.newPatient();
  }

  newPatient(): void {
    this.submitted = false;
    this.patient = new Patient();
    this.patient.patientStatus = PatientStatus.SUSPECTED;
    this.patient.medicalInstitute = this.medicalInstitute;
    this.patient.district = this.medicalInstitute.district;
  }

  save() {
    this.patientService.createPatient(this.patient)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/']);
  }
}