import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsUsersLayoutsRoutingModule } from './coordinators-users-layouts-routing.module';
import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';
import { NbCardModule } from '@nebular/theme';
import { CoordinatorsUsersTableComponent } from './coordinators-users-table/coordinators-users-table.component';
import { CoordinatorsUsersFormComponent } from './coordinators-users-form/coordinators-users-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../components/form-components/reactive-select/reactive-select.module';
import { FormDocumentModule } from '../../components/form-components/forms/form-document/form-document.module';
import { FormRegionalAddressModule } from '../../components/form-components/forms/form-regional-address/form-regional-address.module';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoordinatorsUsersLayoutsComponent,
    CoordinatorsUsersTableComponent,
    CoordinatorsUsersFormComponent],
  imports: [
    CommonModule,
    CoordinatorsUsersLayoutsRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,

    // Custom module
    ReactiveFormsModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormDocumentModule,
    FormRegionalAddressModule,
  ]
})
export class CoordinatorsUsersLayoutsModule { }
