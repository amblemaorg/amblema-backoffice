import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersLayoutRoutingModule } from './admin-users-layout-routing.module';
import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule, NbSpinnerModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';

import { ReactiveInputModule } from '../../../_components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../../_components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from '../../../_components/shared/modal/modal-forms/modal.module';
import { FormDocumentModule } from '../../../_components/form-components/forms/form-document/form-document.module';
import { FormRegionaladdressModule } from '../../../_components/form-components/forms/form-regional-address/form-regional-address.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUserViewComponent } from './admin-user-view/admin-user-view.component';
import { ProgressModule } from '../../../_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    AdminUsersLayoutComponent,
    AdminUserTableComponent,
    AdminUserFormComponent,
    AdminUserViewComponent,
  ],
  imports: [
    NbCardModule,
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AdminUsersLayoutRoutingModule,
    NbSpinnerModule,
    NbAlertModule,

    // Custom module
    NbButtonModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ProgressModule,
    ModalModule,
    FormDocumentModule,
    FormRegionaladdressModule
  ]
})
export class AdminUsersLayoutModule { }
