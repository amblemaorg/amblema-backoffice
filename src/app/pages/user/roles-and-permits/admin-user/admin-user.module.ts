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

@NgModule({
  entryComponents: [ModalFormAdminComponent],
  declarations: [ModalFormAdminComponent, AdminUserComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    ModalModule.forRoot(),
    CommonModule,
    FormModule,
    ReactiveInputModule,
    ReactiveFormsModule,
    FormsModule,
    AdminUserRoutingModule,
  ],
})
export class AdminUserModule {}
