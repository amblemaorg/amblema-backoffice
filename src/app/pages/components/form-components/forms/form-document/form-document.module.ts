import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDocumentComponent } from './form-document.component';
import { ReactiveInputModule } from '../../reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../reactive-select/reactive-select.module';

@NgModule({
  exports: [
    FormDocumentComponent
  ],
  declarations: [
    FormDocumentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ReactiveSelectModule
  ]
})
export class FormDocumentModule { }
