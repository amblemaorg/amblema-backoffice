import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { IdDocumentComponent } from '../forms/reactive-form-components/id-document/id-document.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    IdDocumentComponent
  ],
  exports: [
    ModalComponent,
    IdDocumentComponent
  ]
})
export class SharedComponentsModule { }
