import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../../_helpers/base-table';
import { Select, Store } from '@ngxs/store';
import { SchoolUserState, SelectedSchoolUser, DeleteSchoolUser } from 'src/app/store/user/school-user.action';
import { Observable } from 'rxjs';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { Utility } from 'src/app/_helpers/utility';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-schools-users-table',
  templateUrl: './schools-users-table.component.html',
})
export class SchoolsUsersTableComponent extends BaseTable implements TableActions {

  @Select( SchoolUserState.schoolUsers ) data$: Observable<SchoolUser[]>;

  constructor(
    private store: Store,
    private helper: Utility ) {
    super('form-schools');
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      code: {
        title: 'Código',
        type: 'string'
      },
      email: {
        title: 'Correo',
        type: 'string'
      },
      address: {
        title: 'Dirección',
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

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        this.store.dispatch( new SelectedSchoolUser( event.data ) );
        $('#school-users-view').modal('show');
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        console.log(event.data);
        this.store.dispatch( new SelectedSchoolUser( event.data ) );
        break;
      case this.ACTION.DELETE:
        // Call delete modal
        this.store.dispatch( new DeleteSchoolUser(event.data) );
        break;
    }
  }
}
