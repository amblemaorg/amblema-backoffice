import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
})
export class CoordinatorsUsersTableComponent extends BaseTable implements OnInit, TableActions {

  data: any = [{
    name: 'Luis',
    lastName: 'Lopez',
    document: '324234',
    phone: '324234324',
    status: 'Activo'
  }];

  constructor() {
    super('form-coordinators');

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

  ngOnInit(): void {  }

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
