import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import {
  UserCreationRequestState,
  DeleteUserCreationRequest,
  UpdateUserCreationRequest,
  GetUserCreationRequests,
} from 'src/app/store/request/user-creation-request.action';
import { Observable, Subscription } from 'rxjs';
import { UserCreationRequest } from 'src/app/_models/request/user-creation-request.model';
import {
  TYPE_REQUEST,
  REQUEST_STATUS,
} from 'src/app/_helpers/convention/request-status';
import { DatePipe } from '@angular/common';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { Utility } from 'src/app/_helpers/utility';
import { UserCreationRequestService } from 'src/app/services/request/user-creation-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ModalService } from 'src/app/services/helper/modal.service';
import { SetCoordinatorUser } from 'src/app/store/user/coordinator-user.action';
import { SetSchoolUser } from 'src/app/store/user/school-user.action';
import { SetSponsorUser } from 'src/app/store/user/sponsor-user.action';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DialogConfirmationComponent } from '../../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-creation-requests',
  templateUrl: './creation-requests.component.html',
  styleUrls: ['./creation-requests.component.scss'],
})
export class CreationRequestsComponent extends BaseTable implements OnInit {
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
  showProgress = false;

  public canEdit = new AuthService().isAllowed(
    ALL_ACTIONS.REQUEST_FIND_USER_EDIT
  );

  subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private toast: CustomToastrService,
    private store: Store,
    private userCreationRequestService: UserCreationRequestService,
    private modalService: ModalService,
    private helper: Utility,
    private modalServicesBs: BsModalService
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
            if (value.includes(search.toUpperCase()) || search === '') {
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
          sortDirection: 'desc',
          title: 'Fecha',
          type: 'string',
          compareFunction: sortDate,
          valuePrepareFunction: (lastLoginTime: any) => {
            return new DatePipe('es-VE').transform(
              lastLoginTime,
              'dd/MM/yyyy h:mm:ss a'
            );
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
            if (value.includes(search.toUpperCase()) || search === '') {
              return true;
            } else {
              return false;
            }
          },
        },
      });

    this.validateAction(
      false,
      !new AuthService().isAllowed(ALL_ACTIONS.REQUEST_FIND_USER_DELETE)
    );
  }

  ngOnInit() {

    this.router.params.subscribe((value) => {
      if (Object.keys(value).length) {
        this.requestSelected = value;
        this.oldRequest = value;

        this.data$.subscribe((res) => {
          res.forEach((request) => {
            if (request.id === this.requestSelected.id) {
              this.requestSelected = request;
              setTimeout(() => {
                this.modalService.open(this.modal);
              }, 1000);
            }
          });
        });
      }
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
        // Call delete modal
        // -- Instance delete

        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar solicitud de creación de usuario',
          '¿Desea eliminar la solicitud seleccionada?'
        );

        // -- Global content services.

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              /**
               * Request sponsor
               */
              if (event.data.type === TYPE_REQUEST.SPONSOR.ORIGINAL) {
                this.userCreationRequestService
                  .deleteUserCreationRequestSponsor(event.data.id)
                  .subscribe(
                    (value) => {
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicitud de crear usuario'
                      );
                      this.store.dispatch(
                        new DeleteUserCreationRequest(event.data)
                      );
                    },
                    (err: any) => {
                      (modal.content as DialogConfirmationComponent).errorDelete(
                        err
                      );
                    }
                  );

                /**
                 * Request school
                 */
              } else if (event.data.type === TYPE_REQUEST.SCHOOL.ORIGINAL) {
                this.userCreationRequestService
                  .deleteUserCreationRequestSchool(event.data.id)
                  .subscribe(
                    (value) => {
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.store.dispatch(
                        new DeleteUserCreationRequest(event.data)
                      );
                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicitud de crear usuario'
                      );
                    },
                    (err: any) => {
                      (modal.content as DialogConfirmationComponent).errorDelete(
                        err
                      );
                    }
                  );
              } else {
                /**
                 * Request coordinator
                 */
                this.userCreationRequestService
                  .deleteUserCreationRequestCoordinator(event.data.id)
                  .subscribe(
                    (value) => {
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.store.dispatch(
                        new DeleteUserCreationRequest(event.data)
                      );
                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicitud de crear usuario'
                      );
                    },
                    (err: any) => {
                      (modal.content as DialogConfirmationComponent).errorDelete(
                        err
                      );
                    }
                  );
              }
            }
          }
        );

        break;
    }
  }

  onApprovedRequest(): void {
    this.requestSelected = Object.assign({}, this.requestSelected);
    this.showProgress = true;

    switch (this.requestSelected.type) {
      case TYPE_REQUEST.COORDINATOR.ORIGINAL:
        this.userCreationRequestService
          .putUserCreationRequestCoordinator(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((resq: any) => {
            if (this.statusSelected === '2') {
              this.store.dispatch(new SetCoordinatorUser(resq.body));

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

            setTimeout(() => {
              this.showProgress = false;
            }, 2500);
          });
        break;
      case TYPE_REQUEST.SCHOOL.ORIGINAL:

        this.userCreationRequestService
          .putUserCreationRequestSchool(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe(
            (resq: any) => {
              if (this.statusSelected === '2') {
                this.store.dispatch(new SetSchoolUser(resq));

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

              setTimeout(() => {
                this.showProgress = false;
              }, 2500);
            },
            (err: any) => {

            }
          );
        break;
      case TYPE_REQUEST.SPONSOR.ORIGINAL:
        this.userCreationRequestService
          .putUserCreationRequestSponsor(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((resq: any) => {
            if (this.statusSelected === '2') {
              this.store.dispatch(new SetSponsorUser(resq));

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
            setTimeout(() => {
              this.showProgress = false;
            }, 2500);
          });
        break;
    }

    // ==============================
    this.store.dispatch(new GetUserCreationRequests());
  }
}
