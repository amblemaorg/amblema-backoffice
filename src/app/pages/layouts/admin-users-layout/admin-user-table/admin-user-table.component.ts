import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ACTION } from '../../../../helpers/text-crud';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {

  // Form settings
  ID_FORM = 'modal-admin-user-form';
  ACTION = ACTION;
  mode;

  settings = {
    noDataMessage: 'No hay registros',
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
      ]
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
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
        title: 'Role',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    }
  };

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


  source: LocalDataSource;

  constructor( private sanitizer: DomSanitizer ) {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() { console.warn('# Problema de seguridad del dom del jquery'); }

  onAction( event: any ) {
    switch (event.action) {
      case ACTION.VIEW :
        // Call view modal
        break;
      case ACTION.EDIT :
          // Change mode purpose
          this.mode = ACTION.EDIT;
          $(`#${this.ID_FORM}`).modal('show');
          break;
      case ACTION.DELETE :
        // Call delete modal
        break;
    }
  }

  newData( event: any ) {}
  updateData( event: any ) {}
}
