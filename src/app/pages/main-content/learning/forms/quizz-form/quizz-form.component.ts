import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TableActions, BaseTable } from 'src/app/helpers/base-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetQuizze, UpdateQuizze, DeleteQuizze } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Quizze, Learning } from 'src/app/models/learning.model';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styles: []
})
export class QuizzFormComponent extends BaseTable implements OnInit, OnDestroy, TableActions {

  @Select( LearningState.quizzes ) data$: Observable<Quizze[]>;
  @Select( LearningState.learning ) learning$: Observable<Learning>;
  subscription: Subscription;

  @Output() senddata = new EventEmitter<Learning>();

  quizzes: Quizze[ ];
  oldQuizze: Quizze;

  anwers: any = [
    { value: 'optionA', label: 'Opción A' },
    { value: 'optionB', label: 'Opción B' },
    { value: 'optionC', label: 'Opción C' },
    { value: 'optionD', label: 'Opción D' },
  ];

  form: FormGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
    optionA: new FormControl('', [Validators.required]),
    optionB: new FormControl('', [Validators.required]),
    optionC: new FormControl('', [Validators.required]),
    optionD: new FormControl('', [Validators.required]),
    correctOption: new FormControl(this.anwers[0].value, [Validators.required])
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
        title: 'Respuesta A',
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
      correctOption: {
        title: 'Respuesta',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value === this.anwers[0].value) {
            return 'A';
          } else if (value === this.anwers[1].value) {
            return 'B';
          } else if (value === this.anwers[2].value) {
            return 'C';
          } else if (value === this.anwers[3].value) {
            return 'D';
          }
        }
      }
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
          this.oldQuizze = event.data;
          this.form.patchValue( event.data );
          break;
      case this.ACTION.DELETE:
          this.store.dispatch( new DeleteQuizze( event.data ) );
          break;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.MODE === this.ACTION.CREATE && this.form.valid ) {
      this.store.dispatch( new SetQuizze( this.form.value ) );
      this.form.reset();
      this.submitted = false;
      this.form.controls.correctOption.setValue(this.anwers[0].value);
    } else if ( this.MODE === this.ACTION.EDIT && this.form.valid ) {
      this.store.dispatch( new UpdateQuizze( this.oldQuizze, this.form.value ));
      this.form.reset();
      this.submitted = false;
      this.MODE = this.ACTION.CREATE;
      this.form.controls.correctOption.setValue(this.anwers[0].value);
    }
  }

  onSaveAll() {
    this.subscription = this.learning$.subscribe( response => {
      this.senddata.emit(response);
    });
  }
}
