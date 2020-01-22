import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { TableActions } from '../../shared/base-table';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements TableActions,  OnInit {

  mode = ACTION.CREATE;
  ACTION = ACTION;

  settings = {
    noDataMessage: 'No hay registros',
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
      ]
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      role: {
        title: 'Rol',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      },
    }
  };

  source: LocalDataSource;
  data: any = [
    { role: 'oficinista', status: 'Activo' },
    { role: 'Administrador', status: 'Inactivo' },
  ];

  constructor( private router: Router ) {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {
  }

  onAction( event: any ) {
    switch (event.action) {
      case ACTION.EDIT :
          // Change mode purpose
          this.mode = ACTION.EDIT;
          this.router.navigate(['/pages/permissions/actions']);
          break;
      case ACTION.DELETE :
        // Call delete modal
        break;
    }
  }

  newData( data: any ): void {}
  updateData(data: any): void {}
}
