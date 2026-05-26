import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Store, Select } from '@ngxs/store';
import {
  SponsorUserState,
  DeleteSponsorUser,
  SelectedSponsorUser,
  GetSponsorUsers
} from 'src/app/store/user/sponsor-user.action';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { Utility } from 'src/app/_helpers/utility';
import { ModalService } from 'src/app/services/helper/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { SponsorUserService } from 'src/app/services/user/sponsor-user.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-sponsors-users-table',
  templateUrl: './sponsors-users-table.component.html',
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
export class SponsorsUsersTableComponent extends BaseTable
  implements TableActions, OnInit {
  @Select(SponsorUserState.sponsorUsers) data$: Observable<SponsorUser[]>;

  public isCan = new AuthService().isAllowed(ALL_ACTIONS.SPONSOR_USER_CREATE);

  loadingTable = false;
  loadingView = false;

  constructor(
    private modalServices: ModalService,
    private modalServicesBs: BsModalService,
    private helper: Utility,
    private store: Store,
    private sponsorUserService: SponsorUserService,
    private cdr: ChangeDetectorRef
  ) {
    super('form-sponsors');

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      companyRif: {
        title: 'Cédula / Rif',
        type: 'string',
      },
      companyPhone: {
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
      !new AuthService().isAllowed(ALL_ACTIONS.SPONSOR_USER_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.SPONSOR_USER_DELETE)
    );
  }

  ngOnInit() {
    this.loadingTable = true;
    this.cdr.detectChanges();
    this.store.dispatch(new GetSponsorUsers());
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
          this.store.dispatch(new SelectedSponsorUser(event.data));
          this.loadingView = false;
          $('#sponsor-users-view').modal('show');
        }, 0);
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.modalServices.open('form-sponsor-user');
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');

        this.store.dispatch(new SelectedSponsorUser(event.data));
        break;
      case this.ACTION.DELETE:
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

        (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.sponsorUserService
                .deleteSponsorUser(event.data.id)
                .subscribe(
                  (response) => {
                    this.store.dispatch(new DeleteSponsorUser(event.data));
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

  onRegister() {
    this.modalServices.open('form-sponsor-user');
    this.MODE = this.ACTION.CREATE;
  }
}
