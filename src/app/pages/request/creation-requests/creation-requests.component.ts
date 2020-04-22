import { Component, OnInit, ɵConsole } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Select } from '@ngxs/store';
import { UserCreationRequestState } from 'src/app/store/request/user-creation-request.action';
import { Observable } from 'rxjs';
import { UserCreationRequest } from 'src/app/models/request/user-creation-request.model';
import { TYPE_REQUEST, REQUEST_STATUS } from 'src/app/helpers/convention/request-status';
import { DatePipe } from '@angular/common';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { Utility } from 'src/app/helpers/utility';

@Component({
  selector: 'app-creation-requests',
  templateUrl: './creation-requests.component.html',
  styleUrls: ['./creation-requests.component.scss']
})
export class CreationRequestsComponent extends BaseTable implements OnInit {

  @Select(UserCreationRequestState.creationRequests) data$: Observable<UserCreationRequest[]>;

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

  constructor( private helper: Utility ) { super(); }

  ngOnInit() {


    this.data$.subscribe( response => {
      console.log( response );
    } );

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
        projectCode: {
          title: 'ID del proyecto',
          type: 'string'
        },
        type: {
          title: 'Tipo de solicitante',
          type: 'text',
          valuePrepareFunction: (row: any) => {
            const value: string = row === TYPE_REQUEST.COORDINATOR.ORIGINAL ? TYPE_REQUEST.COORDINATOR.CONVERTION :
              row === TYPE_REQUEST.SCHOOL.ORIGINAL ? TYPE_REQUEST.SCHOOL.CONVERTION : TYPE_REQUEST.SPONSOR.CONVERTION;
            return value;
          },
          filterFunction(cell?: any, search?: string): boolean {
            let value: string = cell === TYPE_REQUEST.COORDINATOR.ORIGINAL ? TYPE_REQUEST.COORDINATOR.CONVERTION :
              cell === TYPE_REQUEST.SCHOOL.ORIGINAL ? TYPE_REQUEST.SCHOOL.CONVERTION : TYPE_REQUEST.SPONSOR.CONVERTION;

            value = value.toUpperCase();
            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
              return true;
            } else { return false; }
          }
        },
        user: {
          title: 'Solicitante',
          type: 'string'
        },
        createdAt: {
          title: 'Fecha',
          type: 'string',
          compareFunction: sortDate,
          valuePrepareFunction: (lastLoginTime: any) => {
            return new DatePipe('es-VE').transform(lastLoginTime, 'dd/MM/yyyy');
          }
        },
        record: {
          title: 'Estatus',
          type: 'text ',
          valuePrepareFunction: (row: any) => {
            return this.helper.readlyRequestStatus(row.status);
          },
          filterFunction(cell?: any, search?: string): boolean {
            let value: string = cell.status === REQUEST_STATUS.PENDING.CODE ? REQUEST_STATUS.PENDING.VALUE :
            cell.status === REQUEST_STATUS.ACCEPTED.CODE ? REQUEST_STATUS.ACCEPTED.VALUE : REQUEST_STATUS.REJECTED.VALUE;

            value = value.toUpperCase();
            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
              return true;
            } else { return false; }
          }
        }
      };
  }

}
