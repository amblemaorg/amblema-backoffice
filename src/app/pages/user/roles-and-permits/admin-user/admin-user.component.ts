import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalFormAdminComponent } from './modal-form-admin/modal-form-admin.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styles: [],
})
export class AdminUserComponent {
  constructor(private modalService: BsModalService) {}

  openRegister() {
    this.modalService.show(
      ModalFormAdminComponent,
      Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
    );
  }
}
