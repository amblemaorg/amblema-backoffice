import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';

@Component({
  selector: 'app-creation-requests',
  templateUrl: './creation-requests.component.html',
  styleUrls: ['./creation-requests.component.scss']
})
export class CreationRequestsComponent extends BaseTable implements OnInit {

  data: any = [
    {
      idRequest: '000',
      idProject: '101101',
      applicant: 'Jose Jose',
      date: '09/80/2000',
      status: 'Activo',
      type: 'Coordinador'
    }
  ];

  constructor() { super(); }

  ngOnInit() {
    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
      ]
    },

      this.settings.columns = {
        idRequest: {
          title: 'N° de la solicitud',
          type: 'string',
        },
        idProject: {
          title: 'ID del proyecto',
          type: 'string'
        },
        type: {
          title: 'Tipo de solicitante',
          type: 'string'
        },
        applicant: {
          title: 'Solicitante',
          type: 'string'
        },
        date: {
          title: 'Fecha',
          type: 'string'
        },
        status: {
          title: 'Estatus',
          type: 'string '
        }
      };
  }

}
