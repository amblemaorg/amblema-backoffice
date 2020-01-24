import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsLayoutRoutingModule } from './permissions-layout-routing.module';
import { PermissionsLayoutComponent } from './permissions-layout.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesActionsComponent } from './roles-actions/roles-actions.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { FormComponentModule } from '../../components/form-components/form-component.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    PermissionsLayoutComponent, RolesTableComponent, RolesFormComponent, RolesActionsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    PermissionsLayoutRoutingModule,
    FormComponentModule,
    Ng2SmartTableModule,
    NbIconModule
  ]
})
export class PermissionsLayoutModule { }
