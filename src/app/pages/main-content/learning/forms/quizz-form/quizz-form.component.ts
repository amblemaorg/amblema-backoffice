import { Component, OnInit } from '@angular/core';
import { TableActions, BaseTable } from 'src/app/helpers/base-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetQuizze } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Quizze } from 'src/app/models/learning.model';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styles: []
})
export class QuizzFormComponent extends BaseTable implements OnInit, TableActions {

  @Select( LearningState.quizzes ) data$: Observable<Quizze[]>;
  subscription: Subscription;

  quizzes: Quizze[ ];

  form: FormGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
    optionA: new FormControl('', [Validators.required]),
    optionB: new FormControl('', [Validators.required]),
    optionC: new FormControl('', [Validators.required]),
    optionD: new FormControl('', [Validators.required]),
  });
  submitted = false;

  constructor(
    private store: Store
  ) {
    super('form-quizz');

    this.MODE = this.ACTION.CREATE;

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    this.settings.columns = {
      question: {
        title: 'Pregunta',
        type: 'string'
      },
      optionA: {
        title: 'Respuesta A (Respuesta correcta)',
        type: 'string',
      },
      optionB: {
        title: 'Respuesta B',
        type: 'string',
      },
      optionC: {
        title: 'Respuesta C',
        type: 'string',
      },
      optionD: {
        title: 'Respuesta D',
        type: 'string',
      },
    };
  }

  ngOnInit(): void {
    this.subscription = this.data$.subscribe( response => {
        this.quizzes = response;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.CREATE:
          this.MODE = this.ACTION.CREATE;
          break;
      case this.ACTION.EDIT:
          this.MODE = this.ACTION.EDIT;
          this.form.patchValue( event.data );
          break;
      case this.ACTION.DELETE:
        break;
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.MODE === this.ACTION.CREATE ) {
      this.store.dispatch( new SetQuizze( this.form.value ) );
      this.form.reset();
      this.submitted = false;
    }

  }
}
