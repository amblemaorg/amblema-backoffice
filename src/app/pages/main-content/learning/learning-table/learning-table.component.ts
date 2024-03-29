import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/_helpers/base-table';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  LearningState,
  DeleteLearning,
  SelectedLearning,
  ClearLearning,
} from 'src/app/store/learning.action';
import { Learning } from 'src/app/_models/learning.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LearningService } from 'src/app/services/learning.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

declare var $: any;

@Component({
  selector: 'app-learning-table',
  templateUrl: './learning-table.component.html',
  styleUrls: ['./learning-table.component.scss'],
})
export class LearningTableComponent extends BaseTable
  implements OnInit, OnDestroy, TableActions {
  @Select(LearningState.learnings) learnings$: Observable<Learning[]>;
  subscription: Subscription;

  data: Learning;

  public canCreate = new AuthService().isAllowed( ALL_ACTIONS.LEARNING_MODULE_CREATE );

  learnings: Learning[];

  msgAction = 'Nuevo módulo de aprendizaje';
  constructor(
    private router: Router,
    private store: Store,
    private sanatizer: DomSanitizer,
    private modalServicesBs: BsModalService,
    private learningService: LearningService
  ) {
    super('modal-view-learning');
    this.MODE = this.ACTION.CREATE;

    // Add colummns
    this.settings.columns = {
      title: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'html',
        valuePrepareFunction: (row: string) => {
          return this.sanatizer.bypassSecurityTrustHtml(
            `<div class="content-wrapper"><span>${row}</span></div>`
          );
        },
      },
      duration: {
        title: 'Duración HH:MM',
        type: 'string',
        valuePrepareFunction: (row: string) => {
          const data: string = row.slice(0, 2) + ':' + row.slice(2, 4);
          return data;
        },
      },
      createdAt: {
        title: 'Fecha de creación',
        type: 'string',
        compareFunction: sortDate,
        valuePrepareFunction: (lastLoginTime: any) => {
          return new DatePipe('es-VE').transform(lastLoginTime, 'dd/MM/yyyy');
        },
      },
    };

    this.validateAction(
      !new AuthService().isAllowed(ALL_ACTIONS.LEARNING_MODULE_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.LEARNING_MODULE_DELETE)
    );
  }

  ngOnInit(): void {
    this.subscription = this.learnings$.subscribe((response) => {
      this.learnings = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRegister() {
    if (this.MODE === this.ACTION.EDIT) {
      this.MODE = this.ACTION.CREATE;
    }

    this.msgAction = 'Nuevo módulo de aprendizaje';
    this.store.dispatch(new ClearLearning());
    this.router.navigate([
      'pages/content/learning/stepper',
      { state: this.MODE },
    ]);
  }

  // -- CRUD --

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.data = event.data;
        this.store.dispatch(new SelectedLearning(event.data));
        $(`#${this.ID_FORM}`).modal('show');
        break;
      case this.ACTION.EDIT:
        this.msgAction = 'Actualización del módulo de aprendizaje';
        this.MODE = this.ACTION.EDIT;
        this.store.dispatch(new SelectedLearning(event.data));
        this.router.navigate([
          'pages/content/learning/stepper',
          { state: this.MODE },
        ]);
        break;
      case this.ACTION.DELETE:
        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar módulo de aprendizaje',
          '¿Desea eliminar módulo de aprendizaje?'
        );

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.learningService.deleteLearning(event.data.id).subscribe(
                (response) => {
                  (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                  this.store.dispatch(new DeleteLearning(event.data));
                },
                (err: any) => {
                  (modal.content as DialogConfirmationComponent).errorDelete(
                    err
                  );
                }
              );
            }
          }
        );

        break;
    }
  }
}

export const sortDate = (direction: any, a: string, b: string): number => {
  // const first = Number(new DatePipe('es-VE').transform(a, 'yyyyMMdd'));
  // const second = Number(new DatePipe('es-VE').transform(b, 'yyyyMMdd'));

  // const first = Number(new DatePipe('es-VE').transform(a,'yyyyMMdd'));
  // const second = Number(new DatePipe('es-VE').transform(b,'yyyyMMdd'))

  // if (first < second) {
  //     return -1 * direction;
  // }
  //  if (first > second) {
  //      return direction;
  //  }

  if (((new Date(a) as any) < new Date(b)) as any) {
    return -1 * direction;
  }

  if (((new Date(a) as any) > new Date(b)) as any) {
    return direction;
  }

  return 0;
};
