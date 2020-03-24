import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorComponent } from './sponsor.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormSimpleStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { FormFileStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-file-step/form-file-step.module';
import { StepsFormModule } from '../steps-form/steps-form.module';

@NgModule({
  declarations: [SponsorComponent],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    NbCardModule,
    NbButtonModule,

    StepsFormModule,
    FormSimpleStepModule,
    FormFileStepModule,
  ]
})
export class SponsorModule { }
