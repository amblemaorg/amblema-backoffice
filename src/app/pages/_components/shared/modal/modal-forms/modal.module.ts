import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  exports: [
    ModalComponent
  ],
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    NbButtonModule
  ]
})
export class ModalModule { }
