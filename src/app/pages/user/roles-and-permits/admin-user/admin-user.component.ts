import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalFormAdminComponent } from './modal-form-admin/modal-form-admin.component';
import { FormModeService } from '../../_services/form-mode.service';
import { timeStamp } from 'console';
import { FORM_MODALITY } from '../../_shared/abstract-form-mode';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styles: [],
})
export class AdminUserComponent {
  constructor(
    private formModeService: FormModeService,
    private modalService: BsModalService) {
    }



  openRegister() {
    this.formModeService.setMode(FORM_MODALITY.CREATE.VALUE);

    this.modalService.show(
      ModalFormAdminComponent,
      Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
    );
  }

  onEdit() {
    this.formModeService.setMode(FORM_MODALITY.EDIT.VALUE);
    this.modalService.show(
      ModalFormAdminComponent,
      Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
    );
  }
}
