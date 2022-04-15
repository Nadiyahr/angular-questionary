import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Employee } from './model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = [
    {
      firstName: 'Jhon',
      lastName: 'Smith',
      dateOfBirth: '12-02-1988',
      framework: 'angular',
      frameworkVersion: '1.3.3',
      email: 'test@test.test',
      hobby: [
        {name: 'football', duration: '2 month'},
        {name: 'tennis', duration: '6 month'}
      ]
    },
  ];

  constructor() { }

  public getAll() {
    return this.employees;
  }

  public add(obj: Employee) {
    this.employees.push(obj);
  }

  emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(2000),
      map((email) => {
        const emails = this.getAll().map(empl => empl.email)
        return emails.includes(email);
      })
    );
  }
}
