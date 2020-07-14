import { Component, OnInit } from '@angular/core';
import { AbstractSmartTable } from '../../../_shared/smart-table/abstract-smart-table';
import {
  AdminUserState,
  SelectedAdminUser,
} from 'src/app/store/user/admin-user.action';
import { Select, Store } from '@ngxs/store';
import { AdminUser } from 'src/app/_models/user/admin-user.model';
import { Observable } from 'rxjs';
import { FORM_MODALITY } from '../../../_shared/abstract-form-mode';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormModeService } from '../../../_services/form-mode.service';
import { ModalFormAdminComponent } from '../modal-form-admin/modal-form-admin.component';

@Component({
  selector: 'app-table-form-admin',
  templateUrl: './table-form-admin.component.html',
  styleUrls: ['./table-form-admin.component.scss'],
})
export class TableFormAdminComponent extends AbstractSmartTable
  implements OnInit {
  @Select(AdminUserState.adminUsers) dataUsers$: Observable<AdminUser[]>;

  constructor(
    private formModeService: FormModeService,
    private modalService: BsModalService,
    private store: Store
  ) {
    super();
  }

  ngOnInit() {
    this.settings.columns = {
      firstName: {
        title: 'Nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      function: {
        title: 'Cargo',
        type: 'string',
      },
    };
  }

  onCustomAction(event: any) {
    // -- Selected user --
    this.store.dispatch(new SelectedAdminUser(event.data));

    switch (event.action) {
      case FORM_MODALITY.VIEW.value:
        break;
      case FORM_MODALITY.EDIT.value:
        this.formModeService.setMode(FORM_MODALITY.EDIT.value);
        this.modalService.show(
          ModalFormAdminComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case FORM_MODALITY.DELETE.value:
        break;
    }
  }
}
