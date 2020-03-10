import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';
import { Store, Select } from '@ngxs/store';
import { SponsorUserState, DeleteSponsorUser } from 'src/app/store/user-store/sponsor-user.action';
import { Observable } from 'rxjs';
import { SponsorUser } from 'src/app/models/user/sponsor-user.model';
import { Utility } from 'src/app/helpers/utility';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-sponsors-users-table',
  templateUrl: './sponsors-users-table.component.html'
})
export class SponsorsUsersTableComponent extends BaseTable implements TableActions, OnInit {

  @Select( SponsorUserState.sponsorUsers ) data$: Observable<SponsorUser[]>;

  constructor(
    private helper: Utility,
    private store: Store,
  ) {

    super('form-sponsors');

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      email: {
        title: 'Correo',
        type: 'string'
      },
      companyRIF: {
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

  ngOnInit() {
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        break;
      case this.ACTION.DELETE:
        this.store.dispatch( new DeleteSponsorUser( event.data ) )
        break;
    }
  }

}
