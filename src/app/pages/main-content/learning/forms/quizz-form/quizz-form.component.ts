import { Component, OnInit } from '@angular/core';
import { TableActions, BaseTable } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styles: []
})
export class QuizzFormComponent extends BaseTable implements TableActions {

  submitted = false;

  data: any = [
    {
      question: '¿En qué año nacio Simón Bolívar?',
      answer: '24 de julio de 1783',
      wrongOne: '17 de julio de 1783',
      wrongTwo: '24 de julio de 1782',
      wrongThree: '23 de julio de 1783',
      status: 'Activo'
    }
  ];

  constructor() {
    super('form-quizz');

    this.settings.columns = {
      question: {
        title: 'Pregunta',
        type: 'string'
      },
      answer: {
        title: 'Respuesta A (Respuesta correcta)',
        type: 'string',
      },
      wrongOne: {
        title: 'Respuesta B',
        type: 'string',
      },
      wrongTwo: {
        title: 'Respuesta C',
        type: 'string',
      },
      wrongThree: {
        title: 'Respuesta D',
        type: 'string',
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

  onAction(event: any): void {}
  newData(event: any): void {}
  deleteData(event: any): void {}
  updateData(event: any): void {}
}
