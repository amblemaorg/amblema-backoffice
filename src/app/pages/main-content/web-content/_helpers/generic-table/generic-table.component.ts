import { Component, OnInit } from '@angular/core';
import { AbstractPageTable } from '../abstract.page.table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent extends AbstractPageTable implements OnInit {

  data: any = [
    {
      name: 'Pedro',
      lastName: 'Perez',
      position: 'Fundador',
      description: 'Lorem ipsum dolor',
      status: 'Activo'
    }
  ];

  constructor() {
    super();

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

  ngOnInit() {
  }

  onAction(event: any) {
  }
}
