import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsUsersLayoutRoutingModule } from './sponsors-users-layout-routing.module';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';
import { SponsorsUsersFormComponent } from './sponsors-users-form/sponsors-users-form.component';
import { SponsorsUsersTableComponent } from './sponsors-users-table/sponsors-users-table.component';
import { NbCardModule, NbIconModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { FormDocumentModule } from '../../components/form-components/forms/form-document/form-document.module';
import { FormRegionalAddressModule } from '../../components/form-components/forms/form-regional-address/form-regional-address.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputFileModule } from '../../components/form-components/reactive-input-file/reactive-input-file.module';
import { AddressSponsorComponent } from './address-sponsor/address-sponsor.component';
import { TypeCompanyComponent } from './type-company/type-company.component';
import { ReactiveValidationModule } from '../../components/form-components/reactive-validation/reactive-validation.module';
import { SponsorsUsersViewComponent } from './sponsors-users-view/sponsors-users-view.component';

@NgModule({
  declarations: [
    SponsorsUsersLayoutComponent,
    SponsorsUsersFormComponent,
    SponsorsUsersTableComponent,
    AddressSponsorComponent,
    TypeCompanyComponent,
    SponsorsUsersViewComponent
  ],
  imports: [
    CommonModule,
    SponsorsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormRegionalAddressModule,
    NbIconModule,
    NbSpinnerModule,
    NbAlertModule,

    // Add custom module
    ReactiveInputModule,
    ReactiveSelectModule,
    ReactiveInputFileModule,
    ReactiveValidationModule,
    FormDocumentModule,
    FormRegionalAddressModule,
    ModalModule,
  ]
})
export class SponsorsUsersLayoutModule { }