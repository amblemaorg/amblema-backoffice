import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import {
  UserCreationRequestState,
  DeleteUserCreationRequest,
  UpdateUserCreationRequest,
  GetUserCreationRequests,
} from 'src/app/store/request/user-creation-request.action';
import { Observable } from 'rxjs';
import { UserCreationRequest } from 'src/app/models/request/user-creation-request.model';
import {
  TYPE_REQUEST,
  REQUEST_STATUS,
} from 'src/app/helpers/convention/request-status';
import { DatePipe } from '@angular/common';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { Utility } from 'src/app/helpers/utility';
import { UserCreationRequestService } from 'src/app/services/request/user-creation-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ModalService } from 'src/app/services/helper/modal.service';
import { SetCoordinatorUser } from 'src/app/store/user-store/coordinator-user.action';
import { SetSchoolUser } from 'src/app/store/user-store/school-user.action';
import { SetSponsorUser } from 'src/app/store/user-store/sponsor-user.action';

@Component({
  selector: 'app-creation-requests',
  templateUrl: './creation-requests.component.html',
  styleUrls: ['./creation-requests.component.scss'],
})
export class CreationRequestsComponent extends BaseTable {
  @Select(UserCreationRequestState.creationRequests) data$: Observable<
    UserCreationRequest[]
  >;

  modal = 'project-request-modal';
  requestSelected: any = {};
  oldRequest: any = {};

  statusSelected = '2';

  data: any;

  confirmAction = true;
  type = TYPE_REQUEST;

  constructor(
    private toast: CustomToastrService,
    private store: Store,
    private userCreationRequestService: UserCreationRequestService,
    private modalService: ModalService,
    private helper: Utility
  ) {
    super();

    (this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' },
      ],
    }),
      (this.settings.columns = {
        requestCode: {
          title: 'N° de la solicitud',
          type: 'string',
        },
        projectCode: {
          title: 'ID del proyecto',
          type: 'string',
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
                : REQUEST_STATUS.REJECTED.VALUE;

            value = value.toUpperCase();
            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
              return true;
            } else {
              return false;
            }
          },
        },
      });
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.requestSelected = event.data;
        this.oldRequest = event.data;

        this.modalService.open(this.modal);
        break;
      case this.ACTION.DELETE:
        if (event.data.type === TYPE_REQUEST.SPONSOR.ORIGINAL) {
          this.userCreationRequestService
            .deleteUserCreationRequestSponsor(event.data.id)
            .subscribe((response) => {
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicitud de crear usuario'
              );
              this.store.dispatch(new DeleteUserCreationRequest(event.data));
            });
        } else if (event.data.type === TYPE_REQUEST.SCHOOL.ORIGINAL) {
          this.userCreationRequestService
            .deleteUserCreationRequestSchool(event.data.id)
            .subscribe((response) => {
              this.store.dispatch(new DeleteUserCreationRequest(event.data));
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicitud de crear usuario'
              );
            });
        } else {
          this.userCreationRequestService
            .deleteUserCreationRequestCoordinator(event.data.id)
            .subscribe((response) => {
              this.store.dispatch(new DeleteUserCreationRequest(event.data));
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicitud de crear usuario'
              );
            });
        }

        break;
    }
  }

  onApprovedRequest(): void {
    this.requestSelected = Object.assign({}, this.requestSelected);
    switch (this.requestSelected.type) {
      case TYPE_REQUEST.COORDINATOR.ORIGINAL:
        this.userCreationRequestService
          .putUserCreationRequestCoordinator(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((response) => {
            if (this.statusSelected === '2') {
              this.store.dispatch(new SetCoordinatorUser(response));

              this.requestSelected.status = this.statusSelected;

              this.store.dispatch(
                new UpdateUserCreationRequest(
                  this.requestSelected,
                  this.oldRequest
                )
              );

              this.toast.info(
                'Solicitud',
                'Se ha cambiado de estatus la solicitud'
              );
            }
          });
        break;
      case TYPE_REQUEST.SCHOOL.ORIGINAL:
        this.userCreationRequestService
          .putUserCreationRequestSchool(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe(
            (response) => {
              if (this.statusSelected === '2') {
                this.store.dispatch(new SetSchoolUser(response));

                this.requestSelected.status = this.statusSelected;

                this.store.dispatch(
                  new UpdateUserCreationRequest(
                    this.requestSelected,
                    this.oldRequest
                  )
                );

                this.toast.info(
                  'Solicitud',
                  'Se ha cambiado de estatus la solicitud'
                );
              }
            },
            (err: any) => {
              console.log(err);
            }
          );
        break;
      case TYPE_REQUEST.SPONSOR.ORIGINAL:
        this.userCreationRequestService
          .putUserCreationRequestSponsor(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((response) => {
            if (this.statusSelected === '2') {
              this.store.dispatch(new SetSponsorUser(response));

              this.requestSelected.status = this.statusSelected;

              this.store.dispatch(
                new UpdateUserCreationRequest(
                  this.requestSelected,
                  this.oldRequest
                )
              );

              this.toast.info(
                'Solicitud',
                'Se ha cambiado de estatus la solicitud'
              );
            }
          });
        break;
    }

    // ==============================
    this.store.dispatch(new GetUserCreationRequests());
  }
}
