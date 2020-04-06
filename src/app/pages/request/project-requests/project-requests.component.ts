import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';
import { ProjectRequestState, UpdateProjectRequests } from 'src/app/store/request/project-requests.action';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';
import { Utility } from 'src/app/helpers/utility';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { DatePipe } from '@angular/common';
import { REQUEST_STATUS, TYPE_REQUEST } from 'src/app/helpers/convention/request-status';
import { ModalService } from 'src/app/services/helper/modal.service';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-project-requests',
  templateUrl: './project-requests.component.html',
  styleUrls: ['./project-requests.component.scss']
})
export class ProjectRequestsComponent extends BaseTable implements OnInit {

  @Select(ProjectRequestState.projectRquests) data$: Observable<ProjectRequest[]>;

  modal = 'project-request-modal';
  requestSelected: any = {};

  statusSelected = '2';

  confirmAction = true;
  type = TYPE_REQUEST;

  constructor(
    private toast: CustomToastrService,
    private store: Store,
    private projectRequestService: ProjectRequestsService,
    private modalService: ModalService,
    private helper: Utility) { super(''); }

  ngOnInit(): void {
    this.data$.subscribe(response => {
      console.log(response);
    });

    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,

      /* Fake actions */
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
        name: {
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
        status: {
          title: 'Estatus',
          type: 'text ',
          valuePrepareFunction: (row: any) => {
            return this.helper.readlyRequestStatus(row);
          },
          filterFunction(cell?: any, search?: string): boolean {
            let value: string = cell === REQUEST_STATUS.PENDING.CODE ? REQUEST_STATUS.PENDING.VALUE :
              cell === REQUEST_STATUS.ACCEPTED.CODE ? REQUEST_STATUS.ACCEPTED.VALUE : REQUEST_STATUS.REJECTED.VALUE;

            value = value.toUpperCase();
            if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
              return true;
            } else { return false; }
          }
        }
      };
  }

  onAction(event: any): void {
     switch (event.action) {
      case this.ACTION.VIEW:
        this.requestSelected = event.data;
        this.modalService.open(this.modal);
        break;
      case this.ACTION.DELETE:
        // this.store.dispatch(new DeleteProject(event.data.id));
        break;
    }
  }

  onApprovedRequest(): void {
    this.requestSelected = Object.assign({}, this.requestSelected);
    switch (this.requestSelected.type) {
      case TYPE_REQUEST.COORDINATOR.ORIGINAL:
        this.projectRequestService.putProjectRequestCoordinator(
            this.requestSelected.id,
            this.statusSelected.toString() ).subscribe( response => {
          this.store.dispatch( new UpdateProjectRequests( response, this.requestSelected ) );
          this.requestSelected.status = response.status.toString();
          this.toast.info('Solicitud', 'Se ha cambiado de estatus la solicitud');
        });
        break;
      case TYPE_REQUEST.SCHOOL.ORIGINAL:
          this.projectRequestService.putProjectRequestSchool(
            this.requestSelected.id,
            this.statusSelected.toString() ).subscribe( response => {
            this.store.dispatch( new UpdateProjectRequests( response, this.requestSelected ) );
            this.requestSelected.status = response.status.toString();
            this.toast.info('Solicitud', 'Se ha cambiado de estatus la solicitud');
          });
          break;
        case TYPE_REQUEST.SPONSOR.ORIGINAL:
          this.projectRequestService.putProjectRequestSponsor(
            this.requestSelected.id,
            this.statusSelected.toString() ).subscribe( response => {

            this.requestSelected.status = response.status.toString();
            this.store.dispatch( new UpdateProjectRequests( response, this.requestSelected ) );

            this.toast.info('Solicitud', 'Se ha cambiado de estatus la solicitud');
          });
          break;
    }
  }
}
