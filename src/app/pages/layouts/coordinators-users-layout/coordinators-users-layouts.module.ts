import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsUsersLayoutsRoutingModule } from './coordinators-users-layouts-routing.module';
import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';
import { NbCardModule } from '@nebular/theme';
import { CoordinatorsUsersTableComponent } from './coordinators-users-table/coordinators-users-table.component';
import { CoordinatorsUsersFormComponent } from './coordinators-users-form/coordinators-users-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { FormComponentModule } from '../../components/form-components/form-component.module';

@NgModule({
  declarations: [CoordinatorsUsersLayoutsComponent, CoordinatorsUsersTableComponent, CoordinatorsUsersFormComponent],
  imports: [
    CommonModule,
    CoordinatorsUsersLayoutsRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    FormComponentModule,
  ]
})
export class CoordinatorsUsersLayoutsModule { }
