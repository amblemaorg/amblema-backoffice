import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { ModalFormAdminComponent } from './modal-form-admin/modal-form-admin.component';
import { AdminUserComponent } from './admin-user.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveInputModule } from '../../_shared/reactive-input/reactive-input.module';
import { FormModule } from '../../_shared/form/form.module';
import { ReactiveSelectModule } from '../../_shared/reactive-select/reactive-select.module';
import { TableFormAdminComponent } from './table-form-admin/table-form-admin.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  entryComponents: [ModalFormAdminComponent],
  declarations: [
    ModalFormAdminComponent,
    AdminUserComponent,
    TableFormAdminComponent,
  ],
  imports: [
    NbCardModule,
    NbButtonModule,
    ModalModule.forRoot(),
    CommonModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    FormModule, // <-- Custom form
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    AdminUserRoutingModule,
  ],
})
export class AdminUserModule {}
