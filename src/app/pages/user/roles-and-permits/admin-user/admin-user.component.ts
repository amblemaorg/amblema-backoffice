import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalFormAdminComponent } from './modal-form-admin/modal-form-admin.component';
import { FormModeService } from '../../_services/form-mode.service';
import { FORM_MODALITY } from '../../_shared/abstract-form-mode';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styles: [],
})
export class AdminUserComponent {
  constructor(
    private formModeService: FormModeService,
    private modalService: BsModalService
  ) {}

  openRegister() {
    this.formModeService.setMode(FORM_MODALITY.CREATE.value);

    this.modalService.show(
      ModalFormAdminComponent,
      Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
    );
  }
}
