import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsUsersLayoutRoutingModule } from './schools-users-layout-routing.module';
import { SchoolsUsersLayoutComponent } from './schools-users-layout.component';
import { SchoolsUsersFormComponent } from './schools-users-form/schools-users-form.component';
import { SchoolsUsersTableComponent } from './schools-users-table/schools-users-table.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { FormRegionalAddressModule } from '../../components/form-components/shared-form/form-regional-address/form-regional-address.module';
import { FormDocumentModule } from '../../components/form-components/shared-form/form-document/form-document.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,

    // Add custom modules
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormRegionalAddressModule,
    FormDocumentModule,
  ]
})
export class SchoolsUsersLayoutModule { }
