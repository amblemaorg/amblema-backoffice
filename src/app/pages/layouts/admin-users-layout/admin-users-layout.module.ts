import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersLayoutRoutingModule } from './admin-users-layout-routing.module';
import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';

@NgModule({
  declarations: [
    AdminUsersLayoutComponent,
    AdminUserTableComponent,
  ],
  imports: [
    NbCardModule,
    CommonModule,
    Ng2SmartTableModule,
    AdminUsersLayoutRoutingModule,
  ]
})
export class AdminUsersLayoutModule { }
