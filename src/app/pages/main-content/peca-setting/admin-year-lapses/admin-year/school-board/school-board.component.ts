import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-school-board',
  templateUrl: './school-board.component.html',
  styles: []
})
export class SchoolBoardComponent extends BaseTable implements TableActions {

  data: any = [
    {
      name: 'Simon Diaz',
      code: 'AA-2232',
      status: 'Activo'
    },
    {
      name: 'Carnelio Gonzales',
      code: 'AA-2222',
      status: 'Activo'
    },
    {
      name: 'Simon Bolivar',
      code: 'AA-2222',
      status: 'Activo'
    }
  ];

  constructor() {
    super('form-admin-school');

    this.settings.columns = {
      name: {
        title: 'Nombre de la escuela',
        type: 'string'
      },
      code: {
        title: 'Código del plantel',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

  onAction(data: any): void { }
  newData(data: any): void { }
  deleteData(data: any): void { }
  updateData(data: any): void { }
}
