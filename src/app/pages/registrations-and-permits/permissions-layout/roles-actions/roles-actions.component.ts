import { Component } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseTable } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-roles-actions',
  templateUrl: './roles-actions.component.html',
})
export class RolesActionsComponent extends BaseTable {

  MODE = ACTION.EDIT;

  data: any = [
    { action: 'Borrar', status: 'activo' },
    { action: 'Crear', status: 'activo' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    super('form-role-action');

    this.settings.columns = {
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
    }; // End column

    // Remove view action
    this.settings.actions.custom = [
      { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];
  }
}
