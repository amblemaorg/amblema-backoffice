import { Component } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';
import { Select, Store } from '@ngxs/store';
import { AdminUserState, DeleteAdminUser, SelectedAdminUser } from 'src/app/store/user-store/admin-user.action';
import { Observable, Subscription } from 'rxjs';
import { AdminUser } from 'src/app/models/user/admin-user.model';

// To control the bootstrap modal
declare var $: any;

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
})
export class AdminUserTableComponent extends BaseTable implements TableActions {

  @Select(AdminUserState.adminUsers) data$: Observable<AdminUser[]>;
  subscription: Subscription;

  constructor(private store: Store) {

    super('form-admin-user'); // <-- Send ID

    // customers columns
    this.settings.columns = {
      firstName: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      function: {
        title: 'Cargo',
        type: 'string'
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
          if (value.search(search.toUpperCase()) !== -1  || search === '') {
            return true;
          } else { return false }
        }
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // --

        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        this.store.dispatch(new SelectedAdminUser(event.data));
        break;
      case this.ACTION.DELETE:
        this.store.dispatch(new DeleteAdminUser(event.data));
        break;
    }
  }
}
