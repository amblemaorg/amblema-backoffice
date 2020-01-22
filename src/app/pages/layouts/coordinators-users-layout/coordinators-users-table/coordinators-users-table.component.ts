import { Component, OnInit } from '@angular/core';
import { TableBase, TableActions } from '../../../../helpers/base-table';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
  styleUrls: ['./coordinators-users-table.component.scss']
})
export class CoordinatorsUsersTableComponent extends TableBase implements OnInit, TableActions {

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

  ngOnInit() {  }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        // Call view modal
        break;
      case this.ACTION.EDIT:
        // Change mode purpose
        this.mode = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        break;
      case this.ACTION.DELETE:
        // Call delete modal
        break;
    }
  }

  newData(data: any) {

  }

  updateData(data: any): void {

  }

}
