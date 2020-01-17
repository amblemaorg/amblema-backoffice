import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsLayoutRoutingModule } from './permissions-layout-routing.module';
import { PermissionsLayoutComponent } from './permissions-layout.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesActionsComponent } from './roles-actions/roles-actions.component';
import { NbCardModule } from '@nebular/theme';
import { SharedFormsModule } from '../../forms/shared-forms.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    PermissionsLayoutComponent, RolesTableComponent, RolesFormComponent, RolesActionsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    PermissionsLayoutRoutingModule,
    SharedFormsModule,
    Ng2SmartTableModule,
  ]
})
export class PermissionsLayoutModule { }
