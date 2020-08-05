import { Component } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Select, Store } from '@ngxs/store';
import {
  AdminUserState,
  DeleteAdminUser,
  SelectedAdminUser,
} from 'src/app/store/user/admin-user.action';
import { Observable, Subscription } from 'rxjs';
import { AdminUser } from 'src/app/_models/user/admin-user.model';
import { Utility } from 'src/app/_helpers/utility';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { RolesState } from 'src/app/store/role.action';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { AuthService } from 'src/app/services/user/auth.service';

// To control the bootstrap modal
declare var $: any;

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  providers: [BsModalService],
})
export class AdminUserTableComponent extends BaseTable implements TableActions {
  @Select(AdminUserState.adminUsers) data$: Observable<AdminUser[]>;

  public itCan = new AuthService().isAllowed( ALL_ACTIONS.ADMIN_CREATE );

  subscription: Subscription;

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private helper: Utility,
    private store: Store
  ) {
    super('form-admin-user'); // <-- Send ID

    // customers columns
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
      role: {
        title: 'Rol',
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filter: true,
        filterFunction(cell?: any, search?: string): boolean {
          let value: string = cell.name.toString();
          value = value.toUpperCase();
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return this.helper.readlyStatus([{ status: row }])[0].status;
        },
        filterFunction(cell?: any, search?: string): boolean {
          let value: string = cell === '1' ? 'Activo' : 'Inactivo';

          value = value.toUpperCase();
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
    };

    this.validateAction(
      !new AuthService().isAllowed(ALL_ACTIONS.ADMIN_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.ADMIN_DELETE)
    );
  }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // --  Query all data
        $(`#view-admin-user`).modal('show');
        this.store.dispatch(new SelectedAdminUser(event.data));
        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        this.store.dispatch(new SelectedAdminUser(event.data));
        break;
      case this.ACTION.DELETE:
        // -- Instance delete
        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar usuario administrador',
          '¿Desea eliminar este usuario de forma permanente?'
        );

        // -- Listen the action
        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              // -- when pressed Yes
              this.store.dispatch(new DeleteAdminUser(event.data));
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            } else if (result === false) {
              // -- when pressed No
            } else {
              // -- When closing the modal without no or yes
            }
          }
        );

        break;
    }
  }
}
