import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-sponsors-users-table',
  templateUrl: './sponsors-users-table.component.html'
})
export class SponsorsUsersTableComponent extends BaseTable implements TableActions, OnInit {

  data: any = [{
    name: 'Luis',
    lastName: 'Lopez',
    document: '324234',
    phone: '324234324',
    status: 'Activo'
  }];

  constructor() {

    super('form-sponsors');

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      document: {
        title: 'Cédula / Rif',
        type: 'string'
      },
      phone: {
        title: 'Teléfono',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
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
        // Call delete modal
        break;
    }
  }

  newData(data: any): void {}
  updateData(data: any): void {}
  deleteData(data: any): void {}

}
