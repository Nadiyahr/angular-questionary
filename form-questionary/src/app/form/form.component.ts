import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { 
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators 
} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/employee';
import { DuplicateEmailCheck } from '../Utility/checkDuplicateEmail';
import { MinMaxYearForbiden } from '../Utility/minMaxYearForbiden';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DatePipe]
})

export class FormComponent implements OnInit {
  employees: Employee[] = [];
  employeeControl!: FormGroup;
  selectedFramework?: 'angular'|'react'|'vue';
  frameworks = ['angular', 'react', 'vue'];
  versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  model!: NgbDateStruct;
  date!: string;
;
  
  constructor(
    private formBuilder: FormBuilder,
    private _employeeSevice: EmployeeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.employees = this._employeeSevice.getAll();
    this.employeeControl = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern("^[A-Za-z- ]{1,20}$")
      ]],
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z- ]{1,20}$")
      ]),
      dateOfBirth: ['', [Validators.required]],
      framework: new FormControl('', [Validators.required]),
      frameworkVersion: new FormControl('', [Validators.required]),
      email: ['', [Validators.required]],
      hobby: this.formBuilder.array([]),
    });

    this.addNewHobby();
  }

  // usernameValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.emailExists(control.value).pipe(
  //       map(res => {
  //         // if res is true, username exists, return true
  //         return res ? { usernameExists: true } : null;
  //         // NB: Return null if there is no error
  //       })
  //     );
  //   };
  // }

  getStartDate() {
    let timestamp = this.model != null ? new Date(this.model.year, this.model.month-1, this.model.day).getTime() : new Date().getTime();
    this.employeeControl.controls['dateOfBirth'].setValue(this.datePipe.transform(timestamp, 'dd-MM-YYYY'));
  }

  get hobby() {
    return this.employeeControl.get('hobby') as FormArray;
  }

  get framework() {
    return this.employeeControl.get('fra mework');
  }

  get frameworkVersion() {
    return this.employeeControl.get('frameworkVersion');
   
  }

  newHobby(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{2,20}$")
      ]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{2,20}$")
      ]),
    })
  }

  addNewHobby(): void {
    this.hobby.push(this.newHobby())
  }

  changeFram(e: any) {
    this.framework?.setValue(e.target.value, {
      onlySelf: true,
    });

    this.selectedFramework = e.target.value.replace(/\d: /, '');

    console.log(this.selectedFramework);
  }

  changeVersion(e: any) {
    this.frameworkVersion?.setValue(e.target.value, {
      onlySelf: true,
    })
  }

  onSubmit() {
    console.log(this.employeeControl);
    }
}
