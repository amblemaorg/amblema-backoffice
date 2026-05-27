import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import {
  CoordinatorUserState,
  DeleteCoordinatorUser,
  SelectedCoordinatorUser,
  GetCoordinatorUsers
} from 'src/app/store/user/coordinator-user.action';
import { Select, Store } from '@ngxs/store';
import { CoordinatorUser } from 'src/app/_models/user/coordinator-user.model';
import { Observable, Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';
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
  styles: [`
    .loading-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.45); display: flex; align-items: center;
      justify-content: center; z-index: 9999;
    }
    .loading-box {
      background: #fff; border-radius: 8px; padding: 32px 40px;
      display: flex; flex-direction: column; align-items: center; gap: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .spinner {
      width: 40px; height: 40px; border: 4px solid #e0e0e0;
      border-top-color: #3366ff; border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { margin: 0; font-size: 14px; font-weight: 500; color: #2d3748; }
  `],
})
export class CoordinatorsUsersTableComponent extends BaseTable
  implements OnInit, TableActions {
  @Select(CoordinatorUserState.coordinatorUsers) data$: Observable<
    CoordinatorUser[]
  >;

  public itCan = new AuthService().isAllowed(ALL_ACTIONS.COORDINATOR_USER_CREATE);

  subscription: Subscription;
  loadingTable = false;
  loadingView = false;

  constructor(
    private store: Store,
    private helper: Utility,
    private modalService: BsModalService,
    private coordinatorUserService: CoordinatorUserService,
    private cdr: ChangeDetectorRef
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
          if (value.includes(search.toUpperCase()) || search === '') {
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

  ngOnInit(): void {
    this.loadingTable = true;
    this.cdr.detectChanges();
    this.store.dispatch(new GetCoordinatorUsers());
    this.data$.pipe(skip(1), take(1)).subscribe(
      () => { this.loadingTable = false; }
    );
  }

  onAction(event: any): void {



    switch (event.action) {

      case this.ACTION.VIEW:
        // Call view modal
        this.loadingView = true;
        setTimeout(() => {
          this.store.dispatch(new SelectedCoordinatorUser(event.data));
          this.loadingView = false;
          $('#coordinators-users-view').modal('show');
        }, 0);
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
