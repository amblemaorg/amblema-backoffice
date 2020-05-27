import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-amblema-confirmation-request',
  templateUrl: './amblema-confirmation-request.component.html',
  styleUrls: ['./amblema-confirmation-request.component.scss']
})
export class AmblemaConfirmationRequestComponent extends BaseTable implements OnInit {

  constructor(
    private store: Store,
  
  ) {
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
        type: 'string'
      },
      id: {
        title: 'Id del proyecto',
        type: 'string'
      },
      coordinator: {
        title: '',
        type: 'string'
      },
      sponsor: {
        title: 'Id del proyecto',
        type: 'string'
      },
      school: {
        title: 'Id del proyecto',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    }

  }

  ngOnInit() {
  }

}
