import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralsRoutingModule } from './generals-routing.module';
import { GeneralsComponent } from './generals.component';
import { NbCardModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { FormSimpleStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { FormFileStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-file-step/form-file-step.module';
import { FormVideoStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-video-step/form-video-step.module';
import { StepsFormModule } from '../steps-form/steps-form.module';

@NgModule({
  declarations: [
    GeneralsComponent
  ],
  imports: [
    CommonModule,
    GeneralsRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,

    // Add custom modal
    FormSimpleStepModule,
    StepsFormModule,
    FormFileStepModule,
    FormVideoStepModule,
  ]
})
export class GeneralsModule { }
