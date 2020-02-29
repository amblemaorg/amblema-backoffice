import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LearningState, DeleteLearning } from 'src/app/store/learning.action';
import { Learning } from 'src/app/models/learning.model';

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

  constructor(
    private store: Store
  ) {
    super('form-learning-module');

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
        title: 'Duración',
        type: 'string'
      },
      createdAt: {
        title: 'Fecha de creación',
        type: 'string'
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

  // -- CRUD --

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.CREATE:
        this.MODE = this.ACTION.CREATE;
        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        $(`#${this.ID_FORM}`).modal('show');
        break;
      case this.ACTION.DELETE:
        this.store.dispatch(new DeleteLearning(event.data));
        break;
    }
  }
}
