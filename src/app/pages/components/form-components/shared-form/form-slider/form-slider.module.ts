import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSliderComponent } from './form-slider.component';
import { ReactiveInputFileModule } from '../../reactive-input-file/reactive-input-file.module';
import { ReactiveValidationModule } from '../../reactive-validation/reactive-validation.module';
import { ReactiveTextAreaModule } from '../../reactive-text-area/reactive-text-area.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    FormSliderComponent
  ],
  exports: [
    FormSliderComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputFileModule,
    ReactiveValidationModule,
    ReactiveTextAreaModule,
    Ng2SmartTableModule,
  ]
})
export class FormSliderModule { }
