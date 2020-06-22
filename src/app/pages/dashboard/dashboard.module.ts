import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [ DashboardLayoutComponent ],
  imports: [
    CommonModule,
    NbCardModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
