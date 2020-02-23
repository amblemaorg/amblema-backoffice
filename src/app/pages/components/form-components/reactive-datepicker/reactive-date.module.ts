import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { InputDateComponent } from './reactive-date/input-date.component';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    InputDateComponent
  ],
  imports: [
    CommonModule,
    NgDatepickerModule,
    
    
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    ReactiveValidationModule,
    
  ],
  exports: [
    InputDateComponent
  ]
})
export class ReactiveDateModule { }
