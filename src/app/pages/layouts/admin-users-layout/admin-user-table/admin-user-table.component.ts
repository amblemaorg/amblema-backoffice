import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { type } from 'os';

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnInit {

  title = 'Registro de usuario';
  btnMsg = 'Guardar';  
  isRegister = true;
  idModal = 'modal-admin-user-form';

  settings = {
    noDataMessage: 'No hay registros',
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'view', title: '<i class="far fa-eye fa-sm"></i>' },
        { name: 'edit', title: '<i class="nb-edit"></i>' },
        { name: 'trash', title: '<i class="nb-trash"></i>' }
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
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      role: 'administrador',
      status: 'Sigue tronando'
    },
    {
      name: 'Pedro',
      lastName: 'Infante',
      charge: 'Canta',
      status: 'Sigue tronando'
    },
  ];


  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {
  }

  onAction( event: any ) {
    switch (event.action) {
      case '' :
        break;
      case '' :
        break;
      case '' :
        break;
    }
  }
}
