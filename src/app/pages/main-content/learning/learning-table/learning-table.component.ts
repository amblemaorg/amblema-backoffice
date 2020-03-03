import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LearningState, DeleteLearning, SelectedLearning, ClearLearning } from 'src/app/store/learning.action';
import { Learning } from 'src/app/models/learning.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-learning-table',
  templateUrl: './learning-table.component.html',
  styles: [``]
})
export class LearningTableComponent extends BaseTable implements OnInit, OnDestroy, TableActions {

  @Select( LearningState.learnings ) learnings$: Observable<Learning[]>;
  subscription: Subscription;

  learnings: Learning[ ];
  msgAction = 'Nuevo módulo de aprendizaje';
  constructor(
    private router: Router,
    private store: Store
  ) {
    super('modal-view-learning');
    this.MODE = this.ACTION.CREATE;

    // Add colummns
    this.settings.columns = {
      title: {
        title: 'Nombre',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
      duration: {
        title: 'Duración HH:MM',
        type: 'string',
        valuePrepareFunction: (row: string) =>  {
          const data: string = row.slice(0, 2) + ':' + row.slice(2, 4);
          return data;
        }
      },
      createdAt: {
        title: 'Fecha de creación',
        type: 'string',
        compareFunction: sortDate,
        valuePrepareFunction: (lastLoginTime: any) => {
          return new DatePipe('es-VE').transform(lastLoginTime, 'M/d/yyyy');
        }
      }
    };
  }

  ngOnInit(): void {

    this.subscription = this.learnings$.subscribe( response => {
      this.learnings = response;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onRegister() {


    if ( this.MODE === this.ACTION.EDIT ) {
      this.MODE = this.ACTION.CREATE;
    }

    this.msgAction = 'Nuevo módulo de aprendizaje';
    this.store.dispatch( new ClearLearning());
    this.router.navigate(['pages/content/learning/stepper',  {state: this.MODE}]);
  }

  // -- CRUD --

  onAction(event: any) {

    switch (event.action) {
      case this.ACTION.VIEW:
        this.store.dispatch( new SelectedLearning( event.data ) );
        $(`#${this.ID_FORM}`).modal('show');
        break;
      case this.ACTION.EDIT:
        this.msgAction = 'Actualización del módulo de aprendizaje';
        this.MODE = this.ACTION.EDIT;
        this.store.dispatch( new SelectedLearning( event.data ) );
        this.router.navigate(['pages/content/learning/stepper', { state: this.MODE} ]);
        break;
      case this.ACTION.DELETE:
        this.store.dispatch(new DeleteLearning(event.data));
        break;
    }
  }
}


export const sortDate = (direction: any, a: string, b: string): number => {
  const first = Number(new DatePipe('es-VE').transform(a, 'yyyyMMdd'));
  const second = Number(new DatePipe('es-VE').transform(b, 'yyyyMMdd'));

  if (first < second) {
      return -1 * direction;
  }
  if (first > second) {
      return direction;
  }
  return 0;
};
