import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsUsersLayoutsRoutingModule } from './coordinators-users-layouts-routing.module';
import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [CoordinatorsUsersLayoutsComponent],
  imports: [
    CommonModule,
    CoordinatorsUsersLayoutsRoutingModule,
    NbCardModule
  ]
})
export class CoordinatorsUsersLayoutsModule { }
