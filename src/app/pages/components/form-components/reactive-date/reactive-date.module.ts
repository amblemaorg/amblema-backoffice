import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './date-input.component';
import { NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';

@NgModule({
  declarations: [DateInputComponent],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    ReactiveValidationModule,
    NbDatepickerModule.forRoot()
  ]
})
export class ReactiveDateModule { }
