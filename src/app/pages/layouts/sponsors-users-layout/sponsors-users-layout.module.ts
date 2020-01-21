import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsUsersLayoutRoutingModule } from './sponsors-users-layout-routing.module';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';
import { SponsorsUsersFormComponent } from './sponsors-users-form/sponsors-users-form.component';
import { SponsorsUsersTableComponent } from './sponsors-users-table/sponsors-users-table.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { SharedFormsModule } from '../../forms/shared-forms.module';
import { RegionalAddressesModule } from '../../forms/regional-addresses.module';


@NgModule({
  declarations: [SponsorsUsersLayoutComponent, SponsorsUsersFormComponent, SponsorsUsersTableComponent],
  imports: [
    CommonModule,
    SponsorsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    SharedFormsModule,
    RegionalAddressesModule
  ]
})
export class SponsorsUsersLayoutModule { }
