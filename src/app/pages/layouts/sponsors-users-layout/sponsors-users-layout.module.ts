import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsUsersLayoutRoutingModule } from './sponsors-users-layout-routing.module';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';
import { SponsorsUsersFormComponent } from './sponsors-users-form/sponsors-users-form.component';
import { SponsorsUsersTableComponent } from './sponsors-users-table/sponsors-users-table.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { FormComponentModule } from '../../components/form-components/form-component.module';
import { RegionalAddressesModule } from '../../components/form-components/regional-addresses.module';


@NgModule({
  declarations: [SponsorsUsersLayoutComponent, SponsorsUsersFormComponent, SponsorsUsersTableComponent],
  imports: [
    CommonModule,
    SponsorsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    FormComponentModule,
    RegionalAddressesModule
  ]
})
export class SponsorsUsersLayoutModule { }
