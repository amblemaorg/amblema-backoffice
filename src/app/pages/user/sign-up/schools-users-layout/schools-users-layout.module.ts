import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsUsersLayoutRoutingModule } from './schools-users-layout-routing.module';
import { SchoolsUsersLayoutComponent } from './schools-users-layout.component';
import { SchoolsUsersFormComponent } from './schools-users-form/schools-users-form.component';
import { SchoolsUsersTableComponent } from './schools-users-table/schools-users-table.component';
import { NbCardModule, NbIconModule, NbSpinnerModule, NbAccordionModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputModule } from '../../../_components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../../_components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from '../../../_components/shared/modal/modal-forms/modal.module';
import { FormRegionaladdressModule } from '../../../_components/form-components/forms/form-regional-address/form-regional-address.module';
import { FormDocumentModule } from '../../../_components/form-components/forms/form-document/form-document.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputFileModule } from '../../../_components/form-components/reactive-input-file/reactive-input-file.module';
import { SchooladdressComponent } from './school-address/school-address.component';
import { SchoolsUsersViewComponent } from './schools-users-view/schools-users-view.component';
import { ProgressModule } from '../../../_components/shared/progress/progress.module';
import { MapModule } from '../../../_components/shared/map/map.module';

@NgModule({
  declarations: [
    SchoolsUsersFormComponent,
    SchoolsUsersTableComponent,
    SchoolsUsersLayoutComponent,
    SchooladdressComponent,
    SchoolsUsersViewComponent,
  ],
  imports: [
    CommonModule,
    SchoolsUsersLayoutRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormRegionaladdressModule,
    NbIconModule,
    NbSpinnerModule,
    NbAccordionModule,
    NbAlertModule,
    NbButtonModule,
    ProgressModule,
    MapModule,

    // Add custom modules
    ReactiveInputFileModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ModalModule,
    FormRegionaladdressModule,
    FormDocumentModule,
  ]
})
export class SchoolsUsersLayoutModule { }
