import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { CoordinatorComponent } from './coordinator.component';
import { NbCardModule } from '@nebular/theme';
import { HelpersModule } from '../_helpers/helpers.module';


@NgModule({
  declarations: [CoordinatorComponent],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    NbCardModule,
    HelpersModule,
  ]
})
export class CoordinatorModule { }
