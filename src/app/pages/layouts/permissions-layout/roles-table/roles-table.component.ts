import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { TableActions, BaseTable } from '../../../../helpers/base-table';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent extends BaseTable implements TableActions, OnInit {

  data: any = [
    { role: 'oficinista', status: 'Activo' },
    { role: 'Administrador', status: 'Inactivo' },
  ];

  constructor(private router: Router) {
    super('form-role');

    this.MODE = this.ACTION.CREATE;

    this.settings.columns = {
      role: {
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

  ngOnInit() {
  }

  onAction(event: any) {
    switch (event.action) {
      case ACTION.EDIT:
        // Change mode purpose
        this.MODE = ACTION.EDIT;
        this.router.navigate(['/pages/permissions/actions']);
        break;
      case ACTION.DELETE:
        // Call delete modal
        break;
    }
  }

  newData(data: any): void { }
  updateData(data: any): void { }
}
