import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import {
  ProjectRequestState,
  UpdateProjectRequests,
  DeleteProjectRequests,
} from 'src/app/store/request/project-requests.action';
import { Observable } from 'rxjs';
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

  statusSelected = '2';

  confirmAction = true;
  type = TYPE_REQUEST;
  showProgress = false;

  constructor(
    private router: ActivatedRoute,
    private toast: CustomToastrService,
    private store: Store,
    private projectRequestService: ProjectRequestsService,
    private modalService: ModalService,
    private helper: Utility
  ) {
    super('');
  }

  ngOnInit(): void {
    this.router.params.subscribe((response) => {
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
            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
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
        this.modalService.open(this.modal);

        break;
      case this.ACTION.DELETE:
        if (event.data.type === TYPE_REQUEST.SPONSOR.ORIGINAL) {
          this.projectRequestService
            .deleteProjectRequestSponsor(event.data.id)
            .subscribe((response) => {
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicirud de proyecto'
              );
              this.store.dispatch(new DeleteProjectRequests(event.data));
            });
        } else if (event.data.type === TYPE_REQUEST.SCHOOL.ORIGINAL) {
          this.projectRequestService
            .deleteProjectRequestSchool(event.data.id)
            .subscribe((response) => {
              this.store.dispatch(new DeleteProjectRequests(event.data));
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicirud de proyecto'
              );
            });
        } else {
          this.projectRequestService
            .deleteProjectRequestCoordinator(event.data.id)
            .subscribe((response) => {
              this.store.dispatch(new DeleteProjectRequests(event.data));
              this.toast.deleteRegister(
                'Eliminación',
                'Se ha eliminado una solicirud de proyecto'
              );
            });
        }

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
          .subscribe((response: HttpEvent<any>) => {
            switch (response.type) {
              case HttpEventType.Response:
                this.store.dispatch(
                  new UpdateProjectRequests(response.body, this.requestSelected)
                );

                this.requestSelected.status = response.status.toString();
                this.toast.info(
                  'Solicitud',
                  'Se ha cambiado de estatus la solicitud'
                );
                break;
            }
          });
        break;
      case TYPE_REQUEST.SCHOOL.ORIGINAL:
        this.projectRequestService
          .putProjectRequestSchool(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((response: HttpEvent<any>) => {
            switch (response.type) {
              case HttpEventType.Response:
                // Save storage Project, School and Sponsor if they have it
                this.store.dispatch(
                  new UpdateProjectRequests(response.body, this.requestSelected)
                );

                // Create users and projects when the request is accepted
                if (this.requestSelected === '2') {
                  this.store.dispatch(new AddProject(response.body.project));
                  this.store.dispatch(new SetSchoolUser(response.body.school));
                  if (response.body.sponsor.id) {
                    this.store.dispatch(
                      new SetSponsorUser(response.body.sponsor)
                    );
                  }
                }

                this.requestSelected.status = response.body.record.status.toString();
                this.toast.info(
                  'Solicitud',
                  'Se ha cambiado de estatus la solicitud'
                );
                break;
            }
          });
        break;
      case TYPE_REQUEST.SPONSOR.ORIGINAL:
        this.projectRequestService
          .putProjectRequestSponsor(
            this.requestSelected.id,
            this.statusSelected.toString()
          )
          .subscribe((response: HttpEvent<any>) => {
            switch (response.type) {
              case HttpEventType.Response:
                // Save Storage project
                this.store.dispatch(
                  new UpdateProjectRequests(response.body, this.requestSelected)
                );

                // Create users and project, sponsor and school
                if (this.requestSelected === '2') {
                  this.store.dispatch(new AddProject(response.body.project));
                  this.store.dispatch(
                    new SetSponsorUser(response.body.sponsor)
                  );

                  if (response.body.school.id) {
                    this.store.dispatch(
                      new SetSchoolUser(response.body.school)
                    );
                  }
                }

                this.requestSelected.status = response.body.record.status.toString();
                this.toast.info(
                  'Solicitud',
                  'Se ha cambiado de estatus la solicitud'
                );
                break;
            }
          });
        break;
    }

    // ==============================
    this.store.dispatch(new GetProjects());
  }
}
