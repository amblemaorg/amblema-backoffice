import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSimpleStepComponent } from './form-simple-step.component';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { NbIconModule, NbButtonModule } from '@nebular/theme';
import { ToggleModule } from 'src/app/pages/components/shared/toggle/toggle.module';

@NgModule({
  declarations: [
    FormSimpleStepComponent,
  ],
  exports: [
    FormSimpleStepComponent,
  ],
  imports: [
    CommonModule,
    ReactiveTextAreaModule,
    NbIconModule,
    NbButtonModule,
    ToggleModule
  ]
})
export class FormSimpleStepModule { }
