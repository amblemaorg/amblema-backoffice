import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import {
  ProjectRequestState,
  UpdateProjectRequests,
  DeleteProjectRequests,
} from 'src/app/store/request/project-requests.action';
import { Observable, Subscription } from 'rxjs';
import { ProjectRequest } from 'src/app/_models/request/project-request.model';
import { Utility } from 'src/app/_helpers/utility';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { DatePipe } from '@angular/common';
import {
  REQUEST_STATUS,
  TYPE_REQUEST,
} from 'src/app/_helpers/convention/request-status';
import { ModalService } from 'src/app/services/helper/modal.service';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { GetProjects, AddProject } from 'src/app/store/project.action';
import { SetSchoolUser } from 'src/app/store/user/school-user.action';
import { SetSponsorUser } from 'src/app/store/user/sponsor-user.action';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from '../../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { SetCoordinatorUser } from 'src/app/store/user/coordinator-user.action';

@Component({
  selector: 'app-project-requests',
  templateUrl: './project-requests.component.html',
  styleUrls: ['./project-requests.component.scss'],
})
export class ProjectRequestsComponent extends BaseTable implements OnInit {
  @Select(ProjectRequestState.projectRquests) data$: Observable<
    ProjectRequest[]
  >;

  modal = 'project-request-modal';
  requestSelected: any = {};

  public canEdit = new AuthService().isAllowed(
    ALL_ACTIONS.REQUEST_CREATE_PROJECT_EDIT
  );

  statusSelected = '2';

  confirmAction = true;
  type = TYPE_REQUEST;
  showProgress = false;

  subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private toast: CustomToastrService,
    private store: Store,
    private projectRequestService: ProjectRequestsService,
    private modalService: ModalService,
    private helper: Utility,
    private modalServicesBs: BsModalService
  ) {
    super('');
  }

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      const response = JSON.parse(data.item ? data.item : {});
      if (Object.keys(response).length) {
        this.requestSelected = response;
        setTimeout(() => {
          this.modalService.open(this.modal);
        }, 1000);
      }
    });

    (this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,

      /* Fake actions */
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
        name: {
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
      !new AuthService().isAllowed(ALL_ACTIONS.REQUEST_CREATE_PROJECT_DELETE)
    );
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.requestSelected = event.data;

        this.modalService.open(this.modal);
        break;
      case this.ACTION.DELETE:
        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar solicitud de proyecto',
          '¿Desea eliminar la solicitud de proyecto?'
        );

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              /**
               * Sponsor
               */
              if (event.data.type === TYPE_REQUEST.SPONSOR.ORIGINAL) {
                this.projectRequestService
                  .deleteProjectRequestSponsor(event.data.id)
                  .subscribe(
                    (response) => {

                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicirud de proyecto'
                      );
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.store.dispatch(
                        new DeleteProjectRequests(event.data)
                      );
                    },
                    (err: any) => {
                      (modal.content as DialogConfirmationComponent).errorDelete(
                        err
                      );
                    }
                  );

                /**
                 * School
                 */
              } else if (event.data.type === TYPE_REQUEST.SCHOOL.ORIGINAL) {
                this.projectRequestService
                  .deleteProjectRequestSchool(event.data.id)
                  .subscribe(
                    (response) => {
                      this.store.dispatch(
                        new DeleteProjectRequests(event.data)
                      );
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicirud de proyecto'
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
                 * Coordinador
                 */
                this.projectRequestService
                  .deleteProjectRequestCoordinator(event.data.id)
                  .subscribe(
                    (response) => {
                      (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                      this.store.dispatch(
                        new DeleteProjectRequests(event.data)
                      );
                      this.toast.deleteRegister(
                        'Eliminación',
                        'Se ha eliminado una solicirud de proyecto'
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
    this.showProgress = true;
    this.requestSelected = Object.assign({}, this.requestSelected);

    switch (this.requestSelected.type) {
      case TYPE_REQUEST.COORDINATOR.ORIGINAL:
        this.projectRequestService
          .putProjectRequestCoordinator(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe(
            (response: any) => {

              this.showProgress = false;

              // -- Update project request
              this.store.dispatch(
                new UpdateProjectRequests(response.record, this.requestSelected)
              );

              // -- Add new project no 'projec request'
              this.store.dispatch(new AddProject(response.project));

              // -- New school
              this.store.dispatch(new SetCoordinatorUser(response.coordinator));


              this.requestSelected = response.record;
              this.requestSelected = Object.assign({}, this.requestSelected);
              this.requestSelected.type = this.type.COORDINATOR.ORIGINAL;
              this.toast.info(
                'Solicitud',
                'Se ha cambiado de estatus la solicitud'
              );
            },
            (err) => {
              this.showProgress = false;
              this.toast.error(
                'Error',
                'Error al cambiar el estatus a la solicitud'
              );
            }
          );
        break;
      case TYPE_REQUEST.SCHOOL.ORIGINAL:

        this.projectRequestService
          .putProjectRequestSchool(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe(
            (response: any) => {

              this.showProgress = false;

              // -- Update project request
              this.store.dispatch(
                new UpdateProjectRequests(response.record, this.requestSelected)
              );

              // -- Add new project no 'project request'
              this.store.dispatch(new AddProject(response.project));

              // -- New school
              this.store.dispatch(new SetSchoolUser(response.school));

              // -- Create a user sponsor
              if (response.sponsor.id) {
                this.store.dispatch(
                  new SetSponsorUser(response.sponsor)
                );
              }

              this.requestSelected = response.record;
              this.requestSelected = Object.assign({}, this.requestSelected);
              this.requestSelected.type = this.type.SCHOOL.ORIGINAL;

              this.toast.info(
                'Solicitud',
                'Se ha cambiado de estatus la solicitud'
              );
            },
            (err) => {

              this.showProgress = false;
              this.toast.error(
                'Error',
                'Error al cambiar el estatus a la solicitud'
              );
            }
          );
        break;
      case TYPE_REQUEST.SPONSOR.ORIGINAL:
        this.projectRequestService
          .putProjectRequestSponsor(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe(
            (response: any) => {

              this.showProgress = false;

              // -- Update project request
              this.store.dispatch(
                new UpdateProjectRequests(response.record, this.requestSelected)
              );

              // --  Add new project
              this.store.dispatch(new AddProject(response.project));

              // -- New sponsir
              this.store.dispatch(new SetSponsorUser(response.sponsor));

              // -- If have school user, then create
              if (response.school.id) {
                this.store.dispatch(new SetSchoolUser(response.school));
              }

              this.requestSelected = response.record;
              this.requestSelected = Object.assign({}, this.requestSelected);
              this.requestSelected.type = this.type.SCHOOL.ORIGINAL;


              this.toast.info(
                'Solicitud',
                'Se ha cambiado de estatus la solicitud'
              );
            },
            (err) => {
              this.showProgress = false;
              this.toast.error(
                'Error',
                'Error al cambiar el estatus a la solicitud'
              );
            }
          );
        break;
    }

    // ==============================
    this.store.dispatch(new GetProjects());
  }
}
