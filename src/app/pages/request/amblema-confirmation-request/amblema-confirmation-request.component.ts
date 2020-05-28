import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { Store, Select } from '@ngxs/store';
import { ProjectValidationRequestState } from 'src/app/store/request/project-validation-request.action';
import { Observable, Subscription } from 'rxjs';
import { ProjectValidationRequest } from 'src/app/models/request/project-validate-request.model';
import { AmblemaConfirmation } from './_shared/amblema-confirmation.model';

@Component({
  selector: 'app-amblema-confirmation-request',
  templateUrl: './amblema-confirmation-request.component.html',
  styleUrls: ['./amblema-confirmation-request.component.scss'],
})
export class AmblemaConfirmationRequestComponent extends BaseTable
  implements OnInit, OnDestroy {
  @Select(ProjectValidationRequestState.projectValidationRequest)
  data$: Observable<ProjectValidationRequest[]>;

    subscriptionService: Subscription;

    prepareData: AmblemaConfirmation[];

  constructor(private store: Store) {
    super();

    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: this.ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
      ],
    };

    // N° de la solicitud, Id del proyecto, Padrino, coordinador, escuela, estatus

    this.settings.columns = {
      code: {
        title: 'N° de la solicitud',
        type: 'string',
      },
      id: {
        title: 'Id del proyecto',
        type: 'string',
      },
      coordinator: {
        title: 'Coordinador',
        type: 'string',
      },
      sponsor: {
        title: 'Padrino',
        type: 'string',
      },
      school: {
        title: 'Escuela',
        type: 'string',
      },
      status: {
        title: 'Estatus',
        type: 'string',
      },
    };
  }

  ngOnInit() {
    this.subscriptionService = this.data$.subscribe( response => {
      console.log( response );
      response.forEach( value => {

        // this.prepareData.push({

        // })

      } );
    } );
  }

  ngOnDestroy(): void {
    if ( this.subscriptionService ) { this.subscriptionService.unsubscribe(); }
  }

  onAction(event) {
    switch (event.action) {
      case this.ACTION.EDIT:
        break;
      case this.ACTION.DELETE:
        break;
    }
  }
}
