import { Component } from '@angular/core';
import { BaseTable, TableActions } from '../../../../helpers/base-table';

// To control the bootstrap modal
declare var $: any;

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
})
export class AdminUserTableComponent extends BaseTable implements TableActions {

  data: any = [
    {
      name: 'Jesus',
      lastName: 'Medina',
      charge: 'Administrador',
      role: 'Administrador',
      status: 'Activo'
    },
    {
      name: 'Carlos',
      lastName: 'Gomez',
      charge: 'Administrador',
      role: 'Administrador',
      status: 'Activo'
    },
    {
      name: 'Jack',
      lastName: 'Nicolson',
      charge: 'Administrador',
      role: 'Administrador',
      status: 'Activo'
    },
    {
      name: 'Laura',
      lastName: 'Jimenez',
      charge: 'Coordinadora',
      role: 'Superadmin',
      status: 'Activo'
    },
    {
      name: 'Carla',
      lastName: 'Nore',
      charge: 'Coordinadora',
      role: 'Superadmin',
      status: 'Activo'
    },
    {
      name: 'Sebas',
      lastName: 'Santos',
      charge: 'CEO',
      role: 'Superadmin',
      status: 'Activo'
    },
    {
      name: 'Colbyn',
      lastName: 'Medinas',
      charge: 'CEO',
      role: 'Superadmin',
      status: 'Inactivo'
    },
    {
      name: 'Luis',
      lastName: 'Medinas',
      charge: 'Gerente',
      role: 'Superadmin',
      status: 'Inactivo'
    },
    {
      name: 'Daniel',
      lastName: 'Mohan',
      charge: 'Gerente',
      role: 'Normal',
      status: 'Inactivo'
    },
    {
      name: 'Yorman',
      lastName: 'Gaez',
      charge: 'Gerente',
      role: 'Normal',
      status: 'Inactivo'
    },
    {
      name: 'Elsa',
      lastName: 'Gomez',
      charge: 'Gerente',
      role: 'Normal',
      status: 'Inactivo'
    },
  ];


  constructor() {
    super('form-admin-user');

    // customers columns
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      charge: {
        title: 'Cargo',
        type: 'string'
      },
      role: {
        title: 'Rol',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
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

  newData(event: any) { }
  updateData(event: any) { }
  deleteData(event: any) { }
}
