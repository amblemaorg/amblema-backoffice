import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';

@Component({
  selector: 'app-requests-validate-information',
  templateUrl: './requests-validate-information.component.html',
  styleUrls: ['./requests-validate-information.component.scss']
})
export class RequestsValidateInformationComponent extends BaseTable implements OnInit {

  data: any = [
    {
      idProject: '101101',
      type: 'Testimonio de los docentes', 
      date: '09/80/2000',
      status: 'Activo',
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
        idProject: {
          title: 'ID del proyecto',
          type: 'string'
        },
        type: {
          title: 'Tipo de validación',
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
