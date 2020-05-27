import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import {
  RequestStepApprovalState,
  SelectedRequest,
} from 'src/app/store/request/request-step-approval.action';
import { Observable } from 'rxjs';
import { RequestStepApproval } from 'src/app/models/request/request-step-approval.model';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { DatePipe } from '@angular/common';
import {
  TYPE_REQUEST,
  REQUEST_STATUS,
} from 'src/app/helpers/convention/request-status';
import { Utility } from 'src/app/helpers/utility';
import { NbDialogService } from '@nebular/theme';
import { InformationDetailsComponent } from './information-details/information-details.component';

@Component({
  selector: 'app-requests-validate-information',
  templateUrl: './requests-validate-information.component.html',
  styleUrls: ['./requests-validate-information.component.scss'],
})
export class RequestsValidateInformationComponent extends BaseTable
  implements OnInit {
  @Select(RequestStepApprovalState.requestsStepApproval) data$: Observable<
    RequestStepApproval[]
  >;

  constructor(
    private store: Store,
    private dialogService: NbDialogService,
    private helper: Utility
  ) {
    super();

    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' },
      ],
    };

    this.settings.columns = {
      requestCode: {
        title: 'N° de la solicitud',
        type: 'string',
      },
      project: {
        title: 'ID del proyecto',
        type: 'string',
        valuePrepareFunction: (row: any) => row.code,
        filterFunction: (cell?: any, search?: string) => {
          const value: string = cell.code;
          return value.indexOf(search.toUpperCase()) === 0 || search === ''
            ? true
            : false;
        },
      },
      type: {
        title: 'Tipo de solicitante',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          const value: string =
            row === TYPE_REQUEST.COORDINATOR.ORIGINAL
              ? TYPE_REQUEST.COORDINATOR.CONVERTION
              : row === TYPE_REQUEST.SCHOOL.ORIGINAL
              ? TYPE_REQUEST.SCHOOL.CONVERTION
              : TYPE_REQUEST.SPONSOR.CONVERTION;
          return value;
        },
        filterFunction(cell?: any, search?: string): boolean {
          let value: string =
            cell === TYPE_REQUEST.COORDINATOR.ORIGINAL
              ? TYPE_REQUEST.COORDINATOR.CONVERTION
              : cell === TYPE_REQUEST.SCHOOL.ORIGINAL
              ? TYPE_REQUEST.SCHOOL.CONVERTION
              : TYPE_REQUEST.SPONSOR.CONVERTION;

          value = value.toUpperCase();
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
      user: {
        title: 'Solicitante',
        type: 'string',
        valuePrepareFunction: (row: any) => row.name,
        filterFunction: (cell?: any, search?: string) => {
          if (cell.name) {
            const value: string = cell.name as string;

            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
              return true;
            } else {
              return false;
            }
          }
        },
      },
      createdAt: {
        title: 'Fecha',
        type: 'string',
        compareFunction: sortDate,
        valuePrepareFunction: (lastLoginTime: any) => {
          return new DatePipe('es-VE').transform(lastLoginTime, 'dd/MM/yyyy');
        },
      },
      status: {
        title: 'Estatus',
        type: 'text ',
        valuePrepareFunction: (row: any) => {
          return this.helper.readlyRequestStatus(row);
        },
        filterFunction(cell?: any, search?: string): boolean {
          let value: string =
            cell === REQUEST_STATUS.PENDING.CODE
              ? REQUEST_STATUS.PENDING.VALUE
              : cell === REQUEST_STATUS.ACCEPTED.CODE
              ? REQUEST_STATUS.ACCEPTED.VALUE
              : cell === REQUEST_STATUS.REJECTED.CODE
              ? REQUEST_STATUS.REJECTED.VALUE
              : REQUEST_STATUS.CANCELLED.VALUE;

          value = value.toUpperCase();
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
    };
  }

  ngOnInit() {}

  onAction(event) {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.dialogService.open(InformationDetailsComponent);

        this.store.dispatch(new SelectedRequest(event.data));
        break;
      case this.ACTION.DELETE:
        break;
    }
  }
}
