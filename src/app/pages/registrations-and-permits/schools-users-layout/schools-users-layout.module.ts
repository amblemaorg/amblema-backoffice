import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsUsersLayoutRoutingModule } from './schools-users-layout-routing.module';
import { SchoolsUsersLayoutComponent } from './schools-users-layout.component';
import { SchoolsUsersFormComponent } from './schools-users-form/schools-users-form.component';
import { SchoolsUsersTableComponent } from './schools-users-table/schools-users-table.component';
import { NbCardModule, NbIconModule, NbSpinnerModule, NbAccordionModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { FormRegionalAddressModule } from '../../components/form-components/forms/form-regional-address/form-regional-address.module';
import { FormDocumentModule } from '../../components/form-components/forms/form-document/form-document.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputFileModule } from '../../components/form-components/reactive-input-file/reactive-input-file.module';
import { SchoolAddressComponent } from './school-address/school-address.component';

@NgModule({
  declarations: [
    SchoolsUsersFormComponent,
    SchoolsUsersTableComponent,
    SchoolsUsersLayoutComponent,
    SchoolAddressComponent,
  ],
  imports: [
    CommonModule,
    SchoolsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormRegionalAddressModule,
    NbIconModule,
    NbSpinnerModule,
    NbAccordionModule,

    // Add custom modules
    ReactiveInputFileModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormRegionalAddressModule,
    FormDocumentModule,
  ]
})
export class SchoolsUsersLayoutModule { }
