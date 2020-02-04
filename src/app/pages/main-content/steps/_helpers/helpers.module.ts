import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { NbIconModule } from '@nebular/theme';
import { StepFileComponent } from './step-file/step-file.component';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';



@NgModule({
  declarations: [
    StepComponent,
    StepFileComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,

    // Add custom module
    ReactiveInputFileModule,
    ReactiveTextAreaModule,
    SharedComponentsModule,
  ],
  exports: [
    StepComponent,
    StepFileComponent
  ]
})
export class HelpersModule { }
