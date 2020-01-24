import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';

// JQuery call
declare var $: any;

@Component({
  selector: 'app-schools-users-table',
  templateUrl: './schools-users-table.component.html',
  styleUrls: ['./schools-users-table.component.scss']
})
export class SchoolsUsersTableComponent extends BaseTable implements TableActions, OnInit {


  data: any = [{
    name: 'La escuelita',
    id: '234234DD',
    email: 'escuela@gmail.com',
    address: 'Lara',
    status: 'Activa'
  }];

  constructor() {
    super('form-schools');
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      id: {
        title: 'Código',
        type: 'string'
      },
      email: {
        title: 'Correo',
        type: 'string'
      },
      address: {
        title: 'Dirección',
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

  newData(data: any) {

  }

  updateData(data: any) {

  }

}
