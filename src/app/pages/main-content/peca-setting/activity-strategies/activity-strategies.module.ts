import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityStrategiesRoutingModule } from './activity-strategies-routing.module';
import { ActivityStrategiesComponent } from './activity-strategies.component';
import { NbCardModule } from '@nebular/theme';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';

@NgModule({
  declarations: [ActivityStrategiesComponent],
  imports: [
    CommonModule,
    ActivityStrategiesRoutingModule,
    NbCardModule,
    FormComponentModule
  ]
})
export class ActivityStrategiesModule { }
