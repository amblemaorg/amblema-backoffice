import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveValidationComponent } from './reactive-validation/reactive-validation.component';
import { ReactiveInputComponent } from './inputs/reactive-input/reactive-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ReactiveInputComponent,
    ReactiveValidationComponent ],
  imports: [
    NbInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ReactiveInputComponent]
})
export class ReactiveInputModule { }
