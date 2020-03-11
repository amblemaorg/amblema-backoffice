import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';
import { CoordinatorUserState, DeleteCoordinatorUser, SelectedCoordinatorUser } from 'src/app/store/user-store/coordinator-user.action';
import { Select, Store } from '@ngxs/store';
import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';
import { Observable } from 'rxjs';
import { Utility } from 'src/app/helpers/utility';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
})
export class CoordinatorsUsersTableComponent extends BaseTable implements OnInit, TableActions {

  @Select(CoordinatorUserState.coordinatorUsers) data$: Observable<CoordinatorUser[]>;

  constructor(
    private store: Store,
    private helper: Utility
  ) {
    super('form-coordinators');

    // Custom columns
    this.settings.columns = {
      firstName: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      cardId: {
        title: 'Cédula / Rif',
        type: 'string'
      },
      phone: {
        title: 'Teléfono',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return this.helper.readlyStatus( [{ status: row }] )[0].status;
        },
        filterFunction(cell?: any, search?: string): boolean {


            let value: string = cell === '1' ? 'Activo' : 'Inactivo';

            value = value.toUpperCase();
            if ( value.indexOf( search.toUpperCase() ) === 0 || search === '' ) {
              return true;
            } else { return false;  }
        }
      }
    };
  }

  ngOnInit(): void {  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        this.store.dispatch( new SelectedCoordinatorUser( event.data ) );
        $('#coordinators-users-view').modal('show');
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        this.store.dispatch( new SelectedCoordinatorUser( event.data ) );
        break;
      case this.ACTION.DELETE:
        // Call delete modal
        this.store.dispatch( new DeleteCoordinatorUser(event.data) );
        break;
    }
  }
}
