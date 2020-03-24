import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormSimpleStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { FormFileStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-file-step/form-file-step.module';
import { StepsFormModule } from '../steps-form/steps-form.module';


@NgModule({
  declarations: [SchoolComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom column
    FormSimpleStepModule,
    FormFileStepModule,
    StepsFormModule
  ]
})
export class SchoolModule { }
