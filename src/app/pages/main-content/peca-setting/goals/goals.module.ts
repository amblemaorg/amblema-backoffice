import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [GoalsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    GoalsRoutingModule
  ]
})
export class GoalsModule { }
