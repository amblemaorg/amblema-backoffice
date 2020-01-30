import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/modal/modal.component';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalStepperComponent } from './shared/modal-stepper/modal-stepper.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ModalComponent,
    ToggleComponent,
    ModalStepperComponent,
  ],
  exports: [
    ModalComponent,
    ToggleComponent,

    // Temporal calls
    ReactiveFormsModule,
    FormsModule,
    ModalStepperComponent
  ]
})
export class SharedComponentsModule { }
