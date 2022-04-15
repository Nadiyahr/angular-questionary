import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators 
} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/employee';
import { DuplicateEmailCheck } from '../Utility/checkDuplicateEmail';

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
  employeeFromControl!: Employee;
  
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
      email: ['', [Validators.required, Validators.email], DuplicateEmailCheck.checkEmail(this._employeeSevice)],
      hobby: this.formBuilder.array([]),
    });

    this.addNewHobby();
  }

  //datepiker set value
  getStartDate() {
    let timestamp = this.model != null
      ? new Date(this.model.year, this.model.month-1, this.model.day).getTime()
      : new Date().getTime();
    this.employeeControl.controls['dateOfBirth'].setValue(this.datePipe.transform(timestamp, 'dd-MM-YYYY'));
  }

  //set value select framework
  get framework() {
    return this.employeeControl.get('fra mework');
  }

  changeFram(e: any) {
    this.framework?.setValue(e.target.value, {
      onlySelf: true,
    });

    this.selectedFramework = e.target.value.replace(/\d: /, '');

    console.log(this.selectedFramework);
  }

  //set value select frameworkVersion
  get frameworkVersion() {
    return this.employeeControl.get('frameworkVersion');
   
  }

  changeVersion(e: any) {
    this.frameworkVersion?.setValue(e.target.value.replace(/\d(?=:): /, ''), {
      onlySelf: true,
    })
  }

  //set hobby
  get hobby() {
    return this.employeeControl.get('hobby') as FormArray;
  }

  addNewHobby(): void {
    this.hobby.push(this.newHobby())
  }

  newHobby(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{2,20}$")
      ]],
      duration: ['', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{2,20}$")
      ]],
    })
  }

  onSubmit() {
    console.log(this.employeeControl.value);
    if (this.employeeControl.status === 'VALID') {
      this._employeeSevice.add(this.employeeControl.value)
    } else {
      this.employeeFromControl = this.employeeControl.value;
    }
  }
}
