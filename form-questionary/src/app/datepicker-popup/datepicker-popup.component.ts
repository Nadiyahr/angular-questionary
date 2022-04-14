import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.component.html'
})

export class NgbdDatepickerPopup {
  @Input() date!: string;
  @Output() extract: EventEmitter<any> = new EventEmitter()
  // model!: NgbDateStruct;

  detDate(e: Event) {
    console.log(this.extract.emit(e))
  }
}
