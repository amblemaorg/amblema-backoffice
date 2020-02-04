import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule } from '@nebular/theme';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from '../../../reactive-input-file/reactive-input-file.module';
import { FormFileStepComponent } from './form-file-step.component';

@NgModule({
  declarations: [
    FormFileStepComponent
  ],
  exports: [
    FormFileStepComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    SharedComponentsModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
  ]
})
export class FormFileStepModule { }
