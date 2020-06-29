import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserAdminForm } from '../../../_shared/user-form-abstract';

@Component({
  selector: 'app-modal-form-admin',
  templateUrl: './modal-form-admin.component.html',
  styles: [],
})
export class ModalFormAdminComponent extends UserAdminForm {
  constructor(public bsModalRef: BsModalRef) {
    super();
  }

  // -- On submit --

}
