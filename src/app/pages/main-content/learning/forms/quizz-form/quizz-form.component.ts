import { Component, OnInit } from '@angular/core';
import { TableActions, BaseTable } from 'src/app/helpers/base-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styles: []
})
export class QuizzFormComponent extends BaseTable implements TableActions {

  form: FormGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
    optionA: new FormControl('', [Validators.required]), 
    optionB: new FormControl('', [Validators.required]),
    optionC: new FormControl('', [Validators.required]),
    optionD: new FormControl('', [Validators.required]),
  });
  submitted = false;

  constructor() {
    super('form-quizz');

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

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
}
