import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';
import { Select } from '@ngxs/store';
import { AdminUserState } from 'src/app/store/user-store/admin-user.action';
import { Observable, Subscription } from 'rxjs';
import { AdminUser } from 'src/app/models/user/admin-user.model';

// To control the bootstrap modal
declare var $: any;

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
})
export class AdminUserTableComponent extends BaseTable implements TableActions, OnInit, OnDestroy {

  @Select( AdminUserState.adminUsers ) data$: Observable<AdminUser[]>;
  subscription: Subscription;

  constructor() {

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
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

  ngOnInit(): void {
    this.data$.subscribe( response => console.log(response) );
  }

  ngOnDestroy(): void {

  }

  onAction(event: any) {
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
        // Call delete modal
        break;
    }
  }
}
