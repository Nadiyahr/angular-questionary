import { EmployeeService } from "../employee.service";
import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from '../model/employee';
import { delay } from 'rxjs/operators';

export class DuplicateEmailCheck {
  static checkEmail(_employeeSevice: EmployeeService): AsyncValidatorFn {
    return (c: AbstractControl): Observable<{ [key: string]: boolean } | null> => {

      if (c.value != null && c.value != '') {
        return of(_employeeSevice.getAll()).pipe(delay(2000)).pipe(
          map((res: Employee[]) => {
            if (res.length != 0) {
              let matched: boolean = false;
              for (let index = 0; index < res.length; index++) {
                if (res[index].email == c.value) {
                  matched = true;
                  break;
                }
              }

              if (matched) {
                return { duplicateEmail: true };
              } else {
                return null;
              }

            } else {
              return null;
            }

          })
        );
      }

      return of(null);
    };
  }
}
