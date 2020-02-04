import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityStrategiesRoutingModule } from './activity-strategies-routing.module';
import { ActivityStrategiesComponent } from './activity-strategies.component';
import { NbCardModule } from '@nebular/theme';
import { FormSliderModule } from 'src/app/pages/components/form-components/shared-form/form-slider/form-slider.module';

@NgModule({
  declarations: [ActivityStrategiesComponent],
  imports: [
    CommonModule,
    ActivityStrategiesRoutingModule,
    NbCardModule,

    // Add custom module
    FormSliderModule,
  ]
})
export class ActivityStrategiesModule { }
