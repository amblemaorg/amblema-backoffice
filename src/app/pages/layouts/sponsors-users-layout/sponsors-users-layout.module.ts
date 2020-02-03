import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsUsersLayoutRoutingModule } from './sponsors-users-layout-routing.module';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';
import { SponsorsUsersFormComponent } from './sponsors-users-form/sponsors-users-form.component';
import { SponsorsUsersTableComponent } from './sponsors-users-table/sponsors-users-table.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { FormDocumentModule } from '../../components/form-components/shared-form/form-document/form-document.module';
import { FormRegionalAddressModule } from '../../components/form-components/shared-form/form-regional-address/form-regional-address.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SponsorsUsersLayoutComponent,
    SponsorsUsersFormComponent,
    SponsorsUsersTableComponent
  ],
  imports: [
    CommonModule,
    SponsorsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,

    // Add custom module
    ReactiveInputModule,
    ReactiveSelectModule,
    FormDocumentModule,
    FormRegionalAddressModule,
    ModalModule,
  ]
})
export class SponsorsUsersLayoutModule { }
