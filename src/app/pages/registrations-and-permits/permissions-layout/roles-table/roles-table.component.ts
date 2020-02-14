import { Component } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { Router } from '@angular/router';
import { TableActions, BaseTable } from '../../../../helpers/base-table';
import { Role } from 'src/app/models/permission.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolesState, UpdateRole } from 'src/app/store/role.action';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent extends BaseTable implements TableActions {

  @Select(RolesState.roles) data$: Observable<Role[]>;

  constructor(
    private store: Store,
    private router: Router) {

    super('form-role'); // Related form
    this.MODE = this.ACTION.CREATE;

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Rol',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };

    // Remove view action
    this.settings.actions.custom = [
      { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];
  }

  onAction(event: any) {
    switch (event.action) {
      case ACTION.EDIT:
        this.router.navigate(['/pages/permissions/actions']);
        this.store.dispatch( new UpdateRole(event.data) );
        break;
      case ACTION.DELETE:
        // Call delete modal
        break;
    }
  }
}
