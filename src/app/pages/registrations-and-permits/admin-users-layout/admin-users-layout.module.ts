import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersLayoutRoutingModule } from './admin-users-layout-routing.module';
import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';

import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { FormDocumentModule } from '../../components/form-components/forms/form-document/form-document.module';
import { FormRegionalAddressModule } from '../../components/form-components/forms/form-regional-address/form-regional-address.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminUsersLayoutComponent,
    AdminUserTableComponent,
    AdminUserFormComponent,
  ],
  imports: [
    NbCardModule,
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AdminUsersLayoutRoutingModule,
    NbSpinnerModule,

    // Custom module
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormDocumentModule,
    FormRegionalAddressModule
  ]
})
export class AdminUsersLayoutModule { }
