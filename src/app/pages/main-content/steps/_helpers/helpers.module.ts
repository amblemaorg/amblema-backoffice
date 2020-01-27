import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { NbIconModule } from '@nebular/theme';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';



@NgModule({
  declarations: [StepComponent],
  imports: [
    CommonModule,
    NbIconModule,
    SharedComponentsModule,
    FormComponentModule
  ],
  exports: [
    StepComponent
  ]
})
export class HelpersModule { }
