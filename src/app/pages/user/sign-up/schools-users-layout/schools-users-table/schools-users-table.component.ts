import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Select, Store } from '@ngxs/store';
import {
  SchoolUserState,
  SelectedSchoolUser,
  DeleteSchoolUser,
} from 'src/app/store/user/school-user.action';
import { Observable, Subscription } from 'rxjs';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { Utility } from 'src/app/_helpers/utility';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-schools-users-table',
  templateUrl: './schools-users-table.component.html',
})
export class SchoolsUsersTableComponent extends BaseTable
  implements TableActions {
  @Select(SchoolUserState.schoolUsers) data$: Observable<SchoolUser[]>;

  public isCan =  new AuthService().isAllowed( ALL_ACTIONS.SCHOOL_USER_CREATE );

  subscription: Subscription;

  constructor(
    private modalServicesBs: BsModalService,
    private store: Store,
    private schoolUserService: SchoolUserService,
    private helper: Utility
  ) {
    super('form-schools');
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      code: {
        title: 'Código',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      address: {
        title: 'Dirección',
        type: 'string',
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
          if (value.includes(search.toUpperCase()) || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
    };

    this.validateAction(
      !new AuthService().isAllowed(ALL_ACTIONS.SCHOOL_USER_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.SCHOOL_USER_DELETE)
    );
  }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        this.store.dispatch(new SelectedSchoolUser(event.data));
        $('#school-users-view').modal('show');
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');

        this.store.dispatch(new SelectedSchoolUser(event.data));
        break;
      case this.ACTION.DELETE:
        // Call delete modal
        // -- Instance delete

        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar usuario',
          '¿Desea eliminar el usuario seleccionado?'
        );

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.subscription = this.schoolUserService
                .deleteSchoolUser(event.data.id)
                .subscribe(
                  (response) => {
                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                    this.store.dispatch(new DeleteSchoolUser(event.data));
                  },
                  (err: any) => {
                    (modal.content as DialogConfirmationComponent).errorDelete(
                      err
                    );
                  }
                );
            }
          }
        );

        break;
    }
  }
}
