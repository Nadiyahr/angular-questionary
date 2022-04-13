import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MinMaxYearForbiden {
  static checkYear() {
    const min = new Date().getFullYear() - 80;
    const max = new Date().getFullYear() - 18;

    return (control: AbstractControl): ValidationErrors | null => {
      let value: number = +control.value;

      if (value && value < +min) {
        return {
          'minMaxYearForbiden': true,
          'requiredMinValue': min
        }
      }

      if (value && value > +max) {
        return {
          'minMaxYearForbiden': true,
          'requiredMaxValue': max
        }
      }
      return null;
    }
  }
}