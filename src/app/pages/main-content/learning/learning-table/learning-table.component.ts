import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { LearningService } from 'src/app/services/learning.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-learning-table',
  templateUrl: './learning-table.component.html',
  styles: [``]
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

  subscription: Subscription;

  constructor(
    private learningService: LearningService
  ) {
    super('form-learning-module');

    this.MODE = this.ACTION.CREATE;

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
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        break;
    }
  }
}
