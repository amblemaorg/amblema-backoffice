import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import {
  CoordinatorUserState,
  DeleteCoordinatorUser,
  SelectedCoordinatorUser,
} from 'src/app/store/user/coordinator-user.action';
import { Select, Store } from '@ngxs/store';
import { CoordinatorUser } from 'src/app/_models/user/coordinator-user.model';
import { Observable, Subscription } from 'rxjs';
import { Utility } from 'src/app/_helpers/utility';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { CoordinatorUserService } from 'src/app/services/user/coordinator-user.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
})
export class CoordinatorsUsersTableComponent extends BaseTable
  implements OnInit, TableActions {
  @Select(CoordinatorUserState.coordinatorUsers) data$: Observable<
    CoordinatorUser[]
  >;

  public itCan = new AuthService().isAllowed(ALL_ACTIONS.COORDINATOR_USER_CREATE);

  subscription: Subscription;

  constructor(
    private store: Store,
    private helper: Utility,
    private modalService: BsModalService,
    private coordinatorUserService: CoordinatorUserService
  ) {
    super('form-coordinators');

    // Custom columns
    this.settings.columns = {
      firstName: {
        title: 'Nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      cardId: {
        title: 'Cédula / Rif',
        type: 'string',
      },
      phone: {
        title: 'Teléfono',
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
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
    };

    this.validateAction(
      !new AuthService().isAllowed(ALL_ACTIONS.COORDINATOR_USER_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.COORDINATOR_USER_DELETE)
    );
  }

  ngOnInit(): void {}

  onAction(event: any): void {

    

    switch (event.action) {

      case this.ACTION.VIEW:
        // Call view modal
        this.store.dispatch(new SelectedCoordinatorUser(event.data));
        $('#coordinators-users-view').modal('show');
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        this.store.dispatch(new SelectedCoordinatorUser(event.data));
        break;
      case this.ACTION.DELETE:
        // -- Instance delete

        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar usuario',
          '¿Desea eliminar el usuario seleccionado?'
        );

        (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.subscription = this.coordinatorUserService
                .deleteCoordinatorUser(event.data.id)
                .subscribe(
                  (response) => {
                    this.store.dispatch(new DeleteCoordinatorUser(event.data));

                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();
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
