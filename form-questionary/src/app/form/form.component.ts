import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { 
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators 
} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/employee';
import { DuplicateEmailCheck } from '../Utility/checkDuplicateEmail';
import { MinMaxYearForbiden } from '../Utility/minMaxYearForbiden';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  public employees: Employee[] = [];
  employeeControl!: FormGroup;
  selectedFramework: 'angular'|'react'|'vue'|'' = '';
  frameworks = ['angular', 'react', 'vue'];
  frameworkVersion = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private _employeeSevice: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employees = this._employeeSevice.getAll();
    this.employeeControl = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{1,20}$")
      ]],
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{1,20}$")
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        MinMaxYearForbiden.checkYear(),
      ]),
      framework: ['', [Validators.required]],
      frameworkVersion: ['', [Validators.required]],
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        DuplicateEmailCheck.checkEmail(this._employeeSevice)
      ]),
      hobby: this.formBuilder.array([
        {
          name: new FormControl(null),
          duration: new FormControl(null),
        },
      ]),
    });
  }

  get hobby() {
    return this.employeeControl.get('hobby') as FormArray;
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

  get framework() {
    return this.employeeControl.get('framework');
  }

  onSubmit() {
    console.log(this.employeeControl);
    // console.log(this.employeeControl.get('firstName').value);
    }
}
