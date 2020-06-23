import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { CoordinatorComponent } from './coordinator.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormFileStepModule } from 'src/app/pages/_components/form-components/forms/form-step/form-file-step/form-file-step.module';
import { FormSimpleStepModule } from 'src/app/pages/_components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { StepsFormModule } from '../steps-form/steps-form.module';


@NgModule({
  declarations: [
    CoordinatorComponent],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom module
    FormFileStepModule,
    FormSimpleStepModule,
    StepsFormModule
  ]
})
export class CoordinatorModule { }
