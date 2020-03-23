import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LapseRoutingModule } from './lapse-routing.module';
import { LapseComponent } from './lapse.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import {
  FormSimpleStepModule
} from 'src/app/pages/components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { FormFileStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-file-step/form-file-step.module';


@NgModule({
  declarations: [LapseComponent],
  imports: [
    CommonModule,
    LapseRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom module
    FormSimpleStepModule,
    FormFileStepModule,
  ]
})
export class LapseModule { }
