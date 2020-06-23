import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { ModalFormAdminComponent } from './modal-form-admin/modal-form-admin.component';
import { AdminUserComponent } from './admin-user.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  entryComponents: [ ModalFormAdminComponent ],
  declarations: [ModalFormAdminComponent, AdminUserComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    ModalModule.forRoot(),
    CommonModule,
    AdminUserRoutingModule
  ]
})
export class AdminUserModule { }
