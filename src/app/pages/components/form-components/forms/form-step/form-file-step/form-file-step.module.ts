import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbButtonModule } from '@nebular/theme';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from '../../../reactive-input-file/reactive-input-file.module';
import { FormFileStepComponent } from './form-file-step.component';
import { ToggleModule } from 'src/app/pages/components/shared/toggle/toggle.module';

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
    NbButtonModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
    ToggleModule
  ]
})
export class FormFileStepModule { }
