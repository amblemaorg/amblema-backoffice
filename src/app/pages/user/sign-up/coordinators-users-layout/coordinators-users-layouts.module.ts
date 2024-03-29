import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsUsersLayoutsRoutingModule } from './coordinators-users-layouts-routing.module';
import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';
import {
  NbCardModule,
  NbSpinnerModule,
  NbIconModule,
  NbAccordionModule,
  NbRadioModule,
  NbAlertModule,
  NbButtonModule } from '@nebular/theme';
import { CoordinatorsUsersTableComponent } from './coordinators-users-table/coordinators-users-table.component';
import { CoordinatorsUsersFormComponent } from './coordinators-users-form/coordinators-users-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../../_components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../../_components/form-components/reactive-select/reactive-select.module';
import { FormDocumentModule } from '../../../_components/form-components/forms/form-document/form-document.module';
import { ModalModule } from '../../../_components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveDatepickerModule } from '../../../_components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ReactiveInputFileModule } from '../../../_components/form-components/reactive-input-file/reactive-input-file.module';
import { AddressCoordinatorComponent } from './address-coordinator/address-coordinator.component';
import { CoordinatorsUsersViewComponent } from './coordinators-users-view/coordinators-users-view.component';
import { ProgressModule } from '../../../_components/shared/progress/progress.module';
import { FormLocalAddressModule } from 'src/app/pages/_components/form-components/forms/form-local-address/form-local-address.module';

@NgModule({
  declarations: [
    CoordinatorsUsersLayoutsComponent,
    CoordinatorsUsersTableComponent,
    CoordinatorsUsersFormComponent,
    AddressCoordinatorComponent,
    CoordinatorsUsersViewComponent],
  imports: [
    CommonModule,
    CoordinatorsUsersLayoutsRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,

    NbSpinnerModule,
    ProgressModule,
    NbIconModule,
    NbAccordionModule,
    NbRadioModule,
    NbAlertModule,
    NbButtonModule,

    // Custom module
    ModalModule,
    ReactiveDatepickerModule,
    ReactiveFormsModule,
    ReactiveInputFileModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormDocumentModule,
    FormLocalAddressModule,
  ]
})
export class CoordinatorsUsersLayoutsModule { }
