import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Selector, Select } from '@ngxs/store';
import { ProjectRequestState } from 'src/app/store/request/project-requests.action';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';

@Component({
  selector: 'app-project-requests',
  templateUrl: './project-requests.component.html',
  styleUrls: ['./project-requests.component.scss']
})
export class ProjectRequestsComponent extends BaseTable implements OnInit {

  @Select( ProjectRequestState.projectRquests ) data$: Observable<ProjectRequest[ ]>;

  constructor() { super(''); }

  ngOnInit(): void {

    this.data$.subscribe( response => {
      console.log(response)
    } )

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
        requestCode: {
          title: 'N° de la solicitud',
          type: 'string',
        },
        type: {
          title: 'Tipo de solicitante',
          type: 'string'
        },
        name: {
          title: 'Solicitante',
          type: 'string'
        },
        createdAt: {
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
