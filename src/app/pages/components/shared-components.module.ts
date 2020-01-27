import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/modal/modal.component';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ModalComponent,
    ToggleComponent,
  ],
  exports: [
    ModalComponent,
    ToggleComponent,

    // Temporal calls
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedComponentsModule { }
