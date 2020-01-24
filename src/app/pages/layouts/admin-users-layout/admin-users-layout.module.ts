import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersLayoutRoutingModule } from './admin-users-layout-routing.module';
import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { SharedFormsModule } from '../../components/form-components/shared-forms.module';
import { RegionalAddressesModule } from '../../components/form-components/regional-addresses.module';

@NgModule({
  declarations: [
    AdminUsersLayoutComponent,
    AdminUserTableComponent,
    AdminUserFormComponent,
  ],
  imports: [
    NbCardModule,
    CommonModule,
    Ng2SmartTableModule,
    AdminUsersLayoutRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    RegionalAddressesModule
  ]
})
export class AdminUsersLayoutModule { }
