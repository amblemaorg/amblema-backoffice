import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';

declare var $: any;

@Component({
  selector: 'app-learning-table',
  templateUrl: './learning-table.component.html',
  styles: []
})
export class LearningTableComponent extends BaseTable implements TableActions {

  // Data test
  data: any = [
    {
      name: 'Aprendizaje numero 1',
      estimate: '34 dias',
      score: '32',
      status: 'Activo'
    }
  ];

  constructor() {
    super('form-learning-module');

    // Add colummns
    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      estimate: {
        title: 'Estimación',
        type: 'string'
      },
      score: {
        title: 'Puntuación',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

  // CRUD

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.EDIT:
        // Change mode purpose
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        break;
    }
  }

  deleteData() {}
  newData() {}
  updateData() {}
}
