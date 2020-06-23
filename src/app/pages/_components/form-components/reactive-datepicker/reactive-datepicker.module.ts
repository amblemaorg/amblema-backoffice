import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';

@NgModule({
  declarations: [DatepickerComponent, DatepickerRangeComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    ReactiveValidationModule,
  ],
  exports: [DatepickerComponent, DatepickerRangeComponent],
})
export class ReactiveDatepickerModule {}
