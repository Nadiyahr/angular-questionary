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
  selectFramework = ['angular', 'react', 'vue'];
  selectVersion = {
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
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{1,20}$")
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z][A-Za-z- ]{1,20}$")
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        MinMaxYearForbiden.checkYear(),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        DuplicateEmailCheck.checkEmail(this._employeeSevice)
      ]),
      hobby: new FormGroup({
        name: new FormControl(null),
        duration: new FormControl(null),
      }),
    });
  }


  onSubmit() {
    console.log(this.employeeControl);
    // console.log(this.employeeControl.get('firstName').value);
    }
}
