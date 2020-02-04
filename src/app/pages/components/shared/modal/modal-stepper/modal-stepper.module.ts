import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStepperComponent } from './modal-stepper.component';

@NgModule({
  declarations: [
    ModalStepperComponent,
  ],
  exports: [
    ModalStepperComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ModalStepperModule { }
