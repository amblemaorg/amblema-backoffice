import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsLayoutRoutingModule } from './permissions-layout-routing.module';
import { PermissionsLayoutComponent } from './permissions-layout.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesActionsComponent } from './roles-actions/roles-actions.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PermissionsLayoutComponent,
    RolesTableComponent,
    RolesFormComponent,
    RolesActionsComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    PermissionsLayoutRoutingModule,
    Ng2SmartTableModule,
    NbIconModule,
    ReactiveFormsModule,

    // Custom module
    ReactiveInputModule,
    ReactiveSelectModule,
  ]
})
export class PermissionsLayoutModule { }
