import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { Select, Store } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { sortDate } from '../../main-content/learning/learning-table/learning-table.component';
import { DatePipe } from '@angular/common';
import { REQUEST_STATUS } from 'src/app/_helpers/convention/request-status';
import { Utility } from 'src/app/_helpers/utility';
import { NbDialogService } from '@nebular/theme';
import { InformationDetailsComponent } from './information-details/information-details.component';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  RequestContentState,
  SelectedRequestContent,
  DeleteRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import { RequestContent } from 'src/app/_models/request/request-content-approval.model';
import { TYPE_INFORMATION } from './_shared/type-information';
import { ModalService } from 'src/app/services/helper/modal.service';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { SliderDetailsComponent } from './slider-details/slider-details.component';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { TestimonyDetailsComponent } from './testimony-details/testimony-details.component';
import { ActivatedRoute } from '@angular/router';
import { SpecialActivityDetailsComponent } from './special-activity-details/special-activity-details.component';
import { YearbookDetailsComponent } from './yearbook-details/yearbook-details.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InitialWorkshopDetailsComponent } from './initial-workshop-details/initial-workshop-details.component';
import { SpanPlanningComponent } from './span-planning/span-planning.component';
import { PhotosSchoolDetailsComponent } from './photos-school-details/photos-school-details.component';
import { DialogConfirmationComponent } from '../../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

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

  subscription: Subscription;

  constructor(
    private store: Store,
    private modalServicesBs: BsModalService,
    private dialogService: NbDialogService,
    private toast: CustomToastrService,
    private modal: ModalService,
    private router: ActivatedRoute,
    private serviceInformation: InformationRequestService,
    private helper: Utility,
    private modalService: BsModalService
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
          const value: string = cell.code;
          return value.indexOf(search.toUpperCase()) === 0 || search === ''
            ? true
            : false;
        },
      },
      typeUser: {
        title: 'Tipo de solicitante',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          return row === USER_TYPE.COORDINATOR.VALUE
            ? USER_TYPE.COORDINATOR.LABEL
            : row === USER_TYPE.SCHOOL.VALUE
            ? USER_TYPE.SCHOOL.LABEL
            : USER_TYPE.SPONSOR.LABEL;
        },
        filterFunction(cell?: any, search?: string): boolean {
          let value: string =
            cell === USER_TYPE.COORDINATOR.VALUE
              ? USER_TYPE.COORDINATOR.LABEL
              : cell === USER_TYPE.SCHOOL.VALUE
              ? USER_TYPE.SCHOOL.LABEL
              : USER_TYPE.SPONSOR.LABEL;
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
          let value: string = cell.name as string;

          value = value.toUpperCase();

          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
      type: {
        title: 'Tipo de información',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          return row === TYPE_INFORMATION.STEP.VALUE
            ? TYPE_INFORMATION.STEP.LABEL
            : row === TYPE_INFORMATION.TESTIMONIES.VALUE
            ? TYPE_INFORMATION.TESTIMONIES.LABEL
            : row === TYPE_INFORMATION.ACTIVITY.VALUE
            ? TYPE_INFORMATION.ACTIVITY.LABEL
            : row === TYPE_INFORMATION.SLIDER.VALUE
            ? TYPE_INFORMATION.SLIDER.LABEL
            : row === TYPE_INFORMATION.WORKSHOP.VALUE
            ? TYPE_INFORMATION.WORKSHOP.LABEL
            : row === TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.VALUE
            ? TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.LABEL
            : row === TYPE_INFORMATION.YEARBOOK.VALUE
            ? TYPE_INFORMATION.YEARBOOK.LABEL
            : row === TYPE_INFORMATION.SPAN_PLANNING.VALUE
            ? TYPE_INFORMATION.SPAN_PLANNING.LABEL
            : TYPE_INFORMATION.PICTURES_SCHOOL_ACTIVTIES.LABEL;
        },
        filterFunction: (cell?: any, search?: string) => {
          let value: string =
            cell === TYPE_INFORMATION.STEP.VALUE
              ? TYPE_INFORMATION.STEP.LABEL
              : cell === TYPE_INFORMATION.TESTIMONIES.VALUE
              ? TYPE_INFORMATION.TESTIMONIES.LABEL
              : cell === TYPE_INFORMATION.ACTIVITY.VALUE
              ? TYPE_INFORMATION.ACTIVITY.LABEL
              : cell === TYPE_INFORMATION.SLIDER.VALUE
              ? TYPE_INFORMATION.SLIDER.LABEL
              : cell === TYPE_INFORMATION.WORKSHOP.VALUE
              ? TYPE_INFORMATION.WORKSHOP.LABEL
              : cell === TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.VALUE
              ? TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.LABEL
              : cell === TYPE_INFORMATION.YEARBOOK.VALUE
              ? TYPE_INFORMATION.YEARBOOK.LABEL
              : cell === TYPE_INFORMATION.SPAN_PLANNING.VALUE
              ? TYPE_INFORMATION.SPAN_PLANNING.LABEL
              : TYPE_INFORMATION.PICTURES_SCHOOL_ACTIVTIES.LABEL;

          value = value.toUpperCase();

          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else {
            return false;
          }
        },
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

    this.validateAction( false, !( new AuthService().isAllowed( ALL_ACTIONS.REQUEST_PROJECT_APPROVAL_DELETE ) ) );
  }

  ngOnInit() {
    this.router.params.subscribe((query: any) => {
      if (Object.keys(query).length) {
        this.data$.subscribe((response) => {
          this.store.dispatch(new SelectedRequestContent(query));
        });

        this.showModalDetails(query.type);
      }
    });
  }

  private showModalDetails(type: string): void {
    switch (type) {
      case TYPE_INFORMATION.STEP.VALUE:
        this.modalService.show(
          InformationDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.TESTIMONIES.VALUE:
        this.modalService.show(
          TestimonyDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );

        break;
      case TYPE_INFORMATION.ACTIVITY.VALUE:
        this.modalService.show(
          ActivityDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.SLIDER.VALUE:
        this.modalService.show(
          SliderDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.WORKSHOP.VALUE:
        this.modalService.show(
          InitialWorkshopDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.VALUE:
        this.modalService.show(
          SpecialActivityDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.YEARBOOK.VALUE:
        this.modalService.show(
          YearbookDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.SPAN_PLANNING.VALUE:
        this.modalService.show(
          SpanPlanningComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case TYPE_INFORMATION.PICTURES_SCHOOL_ACTIVTIES.VALUE:
        this.modalService.show(
          PhotosSchoolDetailsComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
    }
  }

  onAction(event) {
    switch (event.action) {
      case this.ACTION.VIEW:
        console.log(event.data);
        this.showModalDetails(event.data.type);
        this.store.dispatch(new SelectedRequestContent(event.data));
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
          'Eliminar solicitud de validación de información',
          '¿Desea eliminar la solictud seleccionada?'
        );

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.serviceInformation
                .deleteRequestContentApproval(event.data.id)
                .subscribe(() => {

                  (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                  this.store.dispatch(new DeleteRequestContent(event.data.id));
                  this.toast.deleteRegister(
                    'Solicitud eliminada',
                    'Se ha eliminado una solicitud'
                  );
                },
                (err: any) => {
                  (modal.content as DialogConfirmationComponent).errorDelete(
                    err
                  );
                });
            }
          }
        );

        break;
    }
  }
}
