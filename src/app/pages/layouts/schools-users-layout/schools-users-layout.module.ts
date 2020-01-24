import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsUsersLayoutRoutingModule } from './schools-users-layout-routing.module';
import { SchoolsUsersLayoutComponent } from './schools-users-layout.component';
import { SchoolsUsersFormComponent } from './schools-users-form/schools-users-form.component';
import { SchoolsUsersTableComponent } from './schools-users-table/schools-users-table.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormComponentModule } from '../../components/form-components/form-component.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { RegionalAddressesModule } from '../../components/form-components/regional-addresses.module';

@NgModule({
  declarations: [
    SchoolsUsersFormComponent,
    SchoolsUsersTableComponent,
    SchoolsUsersLayoutComponent,
  ],
  imports: [
    CommonModule,
    SchoolsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    FormComponentModule,
    SharedComponentsModule,
    RegionalAddressesModule
  ]
})
export class SchoolsUsersLayoutModule { }
