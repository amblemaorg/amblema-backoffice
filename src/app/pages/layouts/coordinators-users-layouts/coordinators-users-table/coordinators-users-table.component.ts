import { Component, OnInit } from '@angular/core';
import { TableBase, TableActions } from '../../shared/base-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ACTION } from '../../../../helpers/text-crud';

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
  styleUrls: ['./coordinators-users-table.component.scss']
})
export class CoordinatorsUsersTableComponent extends TableBase implements OnInit, TableActions {

  source: LocalDataSource = new LocalDataSource();

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
      case ACTION.VIEW:
        // Call view modal
        break;
      case ACTION.EDIT:
        // Change mode purpose
        // this.mode = ACTION.EDIT;
        // $(`#${this.ID_FORM}`).modal('show');
        break;
      case ACTION.DELETE:
        // Call delete modal
        break;
    }
  }

  newData(data: any) {

  }

  update(data: any) {

  }

}
