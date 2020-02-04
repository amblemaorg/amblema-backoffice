import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalStepperComponent } from './shared/modal/modal-stepper/modal-stepper.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ToggleComponent,
  ],
  exports: [
    ToggleComponent,

    // Temporal calls
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedComponentsModule { }
