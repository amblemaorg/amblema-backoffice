import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { DatePipe } from '@angular/common';
import {
  TYPE_REQUEST,
  REQUEST_STATUS,
} from 'src/app/helpers/convention/request-status';
import { Utility } from 'src/app/helpers/utility';
import { NbDialogService } from '@nebular/theme';
import { InformationDetailsComponent } from './information-details/information-details.component';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  RequestContentState,
  SelectedRequestContent,
  DeleteRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import { RequestContent } from 'src/app/models/request/request-content-approval.model';
import { TYPE_INFORMATION } from './_shared/type-information';
import { ModalService } from 'src/app/services/helper/modal.service';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { SliderDetailsComponent } from './slider-details/slider-details.component';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { TestimonyDetailsComponent } from './testimony-details/testimony-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests-validate-information',
  templateUrl: './requests-validate-information.component.html',
  styleUrls: ['./requests-validate-information.component.scss'],
})
export class RequestsValidateInformationComponent extends BaseTable
  implements OnInit {
  @Select(RequestContentState.requestsContent) data$: Observable<
    RequestContent[]
  >;

  constructor(
    private store: Store,
    private dialogService: NbDialogService,
    private toast: CustomToastrService,
    private modal: ModalService,
    private router: ActivatedRoute,
    private serviceInformation: InformationRequestService,
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
      code: {
        title: 'N° de la solicitud',
        type: 'string',
      },
      project: {
        title: 'ID del proyecto',
        type: 'string',
        valuePrepareFunction: (row: any) => row.code,
        filterFunction: (cell?: any, search?: string) => {
          const value: string = cell.detail.project.code;
          return value.indexOf(search.toUpperCase()) === 0 || search === ''
            ? true
            : false;
        },
      },
      typeUser: {
        title: 'Tipo de solicitante',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          const value: string =
            row === USER_TYPE.COORDINATOR.CODE.toString()
              ? USER_TYPE.COORDINATOR.MSG
              : row === USER_TYPE.SCHOOL.CODE.toString()
              ? USER_TYPE.SCHOOL.MSG
              : USER_TYPE.SPONSOR.MSG;
          return `${value}`;
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
        sortDirection: 'desc',
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

  ngOnInit() {
    this.router.params.subscribe((query: any) => {
      if (Object.keys(query).length) {
        this.data$.subscribe((response) => {
          this.store.dispatch(
            new SelectedRequestContent(query)
          );
        });

        console.log( query );

        switch (query.type) {
          case TYPE_INFORMATION.STEP:
            this.dialogService.open(InformationDetailsComponent);
            break;
          case TYPE_INFORMATION.TESTIMONIES:
            this.dialogService.open(TestimonyDetailsComponent);
            break;
          case TYPE_INFORMATION.ACTIVITY:
            this.dialogService.open(ActivityDetailsComponent);
            break;
          case TYPE_INFORMATION.SLIDER:
            this.dialogService.open(SliderDetailsComponent);
            break;
          case TYPE_INFORMATION.WORKSHOP:
            this.modal.open('initial-workshop-modal');
            break;
        }

      }
    });
  }

  onAction(event) {
    switch (event.action) {
      case this.ACTION.VIEW:
        switch (event.data.type) {
          case TYPE_INFORMATION.STEP:
            this.dialogService.open(InformationDetailsComponent);
            break;
          case TYPE_INFORMATION.TESTIMONIES:
            this.dialogService.open(TestimonyDetailsComponent);
            break;
          case TYPE_INFORMATION.ACTIVITY:
            this.dialogService.open(ActivityDetailsComponent);
            break;
          case TYPE_INFORMATION.SLIDER:
            this.dialogService.open(SliderDetailsComponent);
            break;
          case TYPE_INFORMATION.WORKSHOP:
            this.modal.open('initial-workshop-modal');
            break;
        }

        this.store.dispatch(new SelectedRequestContent(event.data));
        break;
      case this.ACTION.DELETE:
        this.serviceInformation
          .deleteRequestContentApproval(event.data.id)
          .subscribe(() => {
            this.store.dispatch(new DeleteRequestContent(event.data.id));
            this.toast.deleteRegister(
              'Solicitud eliminada',
              'Se ha eliminado una solicitud'
            );
          });

        break;
    }
  }
}
