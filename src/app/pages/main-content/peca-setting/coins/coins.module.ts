import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { NbCardModule } from '@nebular/theme';
import { FormFileStepModule } from 'src/app/pages/components/form-components/shared-form/form-step/form-file-step/form-file-step.module';
import {
  FormSimpleStepModule
} from 'src/app/pages/components/form-components/shared-form/form-step/form-simple-step/form-simple-step.module';
import { FormSliderModule } from 'src/app/pages/components/form-components/shared-form/form-slider/form-slider.module';

@NgModule({
  declarations: [CoinsComponent],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    NbCardModule,

    // Add custom module
    FormFileStepModule,
    FormSimpleStepModule,
    FormSliderModule
  ]
})
export class CoinsModule { }
