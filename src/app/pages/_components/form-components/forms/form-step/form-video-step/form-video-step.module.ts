import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVideoStepComponent } from './form-video-step.component';
import { NbIconModule, NbButtonModule } from '@nebular/theme';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from '../../../reactive-input-file/reactive-input-file.module';
import { ToggleModule } from 'src/app/pages/_components/shared/toggle/toggle.module';
import { ReactiveInputModule } from '../../../reactive-input/reactive-input.module';

@NgModule({
  declarations: [
    FormVideoStepComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    ReactiveInputModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
    ToggleModule,
    NbButtonModule,
  ],
  exports : [
    FormVideoStepComponent
  ]
})
export class FormVideoStepModule { }
