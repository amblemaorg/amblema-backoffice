import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Select, Store } from '@ngxs/store';
import {
  SchoolUserState,
  SelectedSchoolUser,
  DeleteSchoolUser,
  GetSchoolUsers,
  GetSchoolUsersCompact,
  GetSchoolUserById
} from 'src/app/store/user/school-user.action';
import { Observable, Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';
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
export class SchoolsUsersTableComponent extends BaseTable
  implements TableActions, OnInit {
  @Select(SchoolUserState.schoolUsers) data$: Observable<SchoolUser[]>;

  public isCan = new AuthService().isAllowed(ALL_ACTIONS.SCHOOL_USER_CREATE);

  subscription: Subscription;
  loadingTable = false;
  loadingView = false;

  constructor(
    private modalServicesBs: BsModalService,
    private store: Store,
    private schoolUserService: SchoolUserService,
    private helper: Utility,
    private cdr: ChangeDetectorRef
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

  ngOnInit() {
    this.loadingTable = true;
    this.cdr.detectChanges();
    this.store.dispatch(new GetSchoolUsers('id,name,code,email,address,status'));
    this.data$.pipe(skip(1), take(1)).subscribe(
      () => { this.loadingTable = false; }
    );
  }


  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        this.loadingView = true;
        this.store.dispatch(new GetSchoolUserById(event.data.id)).subscribe(
          () => { this.loadingView = false; $('#school-users-view').modal('show'); },
          () => { this.loadingView = false; }
        );
        break;
      case this.ACTION.EDIT:
        this.store.dispatch(new GetSchoolUserById(event.data.id)).subscribe(() => {
          // Change mode purpose
          this.MODE = this.ACTION.EDIT;
          $(`#${this.ID_FORM}`).modal('show');
        });
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
