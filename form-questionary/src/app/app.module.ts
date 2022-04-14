import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { DatepickerCustomComponent } from './datepicker-custom/datepicker-custom.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { EmployeeService } from './employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DatepickerCustomComponent,
    NgbdDatepickerPopup
  ],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    NgbModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
