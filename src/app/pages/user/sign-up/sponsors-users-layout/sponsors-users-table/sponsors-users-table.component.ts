import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Store, Select } from '@ngxs/store';
import {
  SponsorUserState,
  DeleteSponsorUser,
  SelectedSponsorUser,
} from 'src/app/store/user/sponsor-user.action';
import { Observable } from 'rxjs';
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
})
export class SponsorsUsersTableComponent extends BaseTable
  implements TableActions {
  @Select(SponsorUserState.sponsorUsers) data$: Observable<SponsorUser[]>;

    public isCan =  new AuthService().isAllowed( ALL_ACTIONS.SPONSOR_USER_CREATE );

  constructor(
    private modalServices: ModalService,
    private modalServicesBs: BsModalService,
    private helper: Utility,
    private store: Store,
    private sponsorUserService: SponsorUserService
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
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
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

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal

        console.log( 'Informacion del padrino seleccionado ' );
        console.log( event.data );

        this.store.dispatch(new SelectedSponsorUser(event.data));
        $('#sponsor-users-view').modal('show');
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
