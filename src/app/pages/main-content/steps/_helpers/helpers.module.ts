import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { NbIconModule } from '@nebular/theme';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';
import { StepFileComponent } from './step-file/step-file.component';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';



@NgModule({
  declarations: [StepComponent, StepFileComponent],
  imports: [
    CommonModule,
    NbIconModule,
    SharedComponentsModule,
    FormComponentModule,
    ReactiveInputFileModule
  ],
  exports: [
    StepComponent,
    StepFileComponent
  ]
})
export class HelpersModule { }
