import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-form-admin',
  templateUrl: './modal-form-admin.component.html',
  styles: []
})
export class ModalFormAdminComponent {

  constructor( public bsModalRef: BsModalRef ) { }
}
