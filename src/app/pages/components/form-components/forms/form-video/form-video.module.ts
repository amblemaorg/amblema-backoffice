import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVideoComponent } from './form-video.component';
import { ReactiveInputModule } from '../../reactive-input/reactive-input.module';
import { ReactiveTextAreaModule } from '../../reactive-text-area/reactive-text-area.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [FormVideoComponent],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ReactiveTextAreaModule,
    Ng2SmartTableModule
  ],
  exports: [
    FormVideoComponent
  ]
})
export class FormVideoModule { }
