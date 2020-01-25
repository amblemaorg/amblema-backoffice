import { Component } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-roles-actions',
  templateUrl: './roles-actions.component.html',
  styleUrls: ['./roles-actions.component.scss']
})
export class RolesActionsComponent {

  MODE = ACTION.EDIT;

  settings = {
    noDataMessage: 'No hay registros',
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      action: {
        title: 'Acción',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        filter: false,
        type: 'html',
        width: '150px',
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(`
          <div class="custom-control custom-switch text-center">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
          `);
        },

      },
    }
  };

  source: LocalDataSource;

  data: any = [
    { action: 'Borrar', status: 'activo' },
    { action: 'Crear', status: 'activo' }
  ];

  constructor( private sanitizer: DomSanitizer ) {
    this.source = new LocalDataSource(this.data);
  }
}
