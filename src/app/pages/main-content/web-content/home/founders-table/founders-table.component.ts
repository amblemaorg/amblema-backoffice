import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-founders-table',
  templateUrl: './founders-table.component.html',
  styleUrls: ['./founders-table.component.scss']
})
export class FoundersTableComponent extends TableBase {

  data: any = [
    {
      name: 'Pedro', 
      lastName: 'Perez', 
      position: 'Fundador', 
      description: 'Lorem ipsum dolor', 
      status: 'Activo'
    }
  ]

    constructor() {

  super('');

  // Chage button actions
  this.settings.actions.custom = [
    { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
    { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
  ];

  // Max display
  this.settings.pager.perPage = 5;

  // Custome
  this.settings.columns = {
    name: {
      title: 'Nombre',
      type: 'string'
    },
    lastName: {
      title: 'Apellido',
      type: 'string'
    },
    position: {
      title: 'Cargo',
      type: 'string'
    },
    description: {
      title: 'Descripción',
      type: 'string'
    },
    status: {
      title: 'Estatus',
      type: 'string'
    }
  };
}
}
