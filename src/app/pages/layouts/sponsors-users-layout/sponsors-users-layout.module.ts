import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsUsersLayoutRoutingModule } from './sponsors-users-layout-routing.module';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';


@NgModule({
  declarations: [SponsorsUsersLayoutComponent],
  imports: [
    CommonModule,
    SponsorsUsersLayoutRoutingModule
  ]
})
export class SponsorsUsersLayoutModule { }
