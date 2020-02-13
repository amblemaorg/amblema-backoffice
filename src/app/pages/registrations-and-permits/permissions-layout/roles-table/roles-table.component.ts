import { Component } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { Router } from '@angular/router';
import { TableActions, BaseTable } from '../../../../helpers/base-table';
import { Role } from 'src/app/models/permission.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolesState } from 'src/app/store/role.action';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent extends BaseTable implements TableActions {

  @Select(RolesState.roles) data$: Observable<Role[]>;

  data: boolean;


  constructor(
    private router: Router) {

    // Related with the form
    super('form-role');

    this.MODE = this.ACTION.CREATE;

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

        // Change mode purpose
        this.MODE = ACTION.EDIT;
        this.router.navigate(['/pages/permissions/actions']);
        this.data = true;
        console.log(event.data);
        break;
      case ACTION.DELETE:

        // Call delete modal
        break;
    }
  }

  newData(data: any): void { }
  updateData(data: any): void { }
}
