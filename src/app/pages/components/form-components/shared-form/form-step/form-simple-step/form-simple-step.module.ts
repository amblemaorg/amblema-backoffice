import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSimpleStepComponent } from './form-simple-step.component';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { NbIconModule } from '@nebular/theme';

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
    SharedComponentsModule,
    NbIconModule,
  ]
})
export class FormSimpleStepModule { }
