import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseTable } from "src/app/_helpers/base-table";
import { ACTION } from "src/app/_helpers/text-content/text-crud";
import { Store, Actions, ofActionSuccessful } from "@ngxs/store";
import { HttpClient } from "@angular/common/http";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { Utility } from "src/app/_helpers/utility";
import { InformationDetailsComponent } from "./information-details/information-details.component";
import { InformationRequestService } from "src/app/services/request/information-request.service";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { NotificationsService } from "src/app/services/notifications.service";
import {
  RequestContentState,
  DeleteRequestContent,
  GetRequestContentById,
  ClearSelectedRequestContent,
  UpdateRequestContent
} from "src/app/store/request/request-content-approval.action";
import { TYPE_INFORMATION } from "./_shared/type-information";
import { ActivityDetailsComponent } from "./activity-details/activity-details.component";
import { SliderDetailsComponent } from "./slider-details/slider-details.component";
import { USER_TYPE } from "src/app/_helpers/convention/user-type";
import { TestimonyDetailsComponent } from "./testimony-details/testimony-details.component";
import { ActivatedRoute } from "@angular/router";
import { SpecialActivityDetailsComponent } from "./special-activity-details/special-activity-details.component";
import { YearbookDetailsComponent } from "./yearbook-details/yearbook-details.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { InitialWorkshopDetailsComponent } from "./initial-workshop-details/initial-workshop-details.component";
import { SpanPlanningComponent } from "./span-planning/span-planning.component";
import { PhotosSchoolDetailsComponent } from "./photos-school-details/photos-school-details.component";
import { AuthService } from "src/app/services/user/auth.service";
import { ALL_ACTIONS } from "src/app/store/_shader/all-actions";
import { RequestsServerDataSource } from "./requests-server-data-source";
import { environment } from "src/environments/environment";
import { DialogConfirmationComponent } from "../../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component";

// Detail modal for each type of information
const DETAIL_COMPONENTS: { [type: string]: any } = {
  [TYPE_INFORMATION.STEP.VALUE]: InformationDetailsComponent,
  [TYPE_INFORMATION.TESTIMONIES.VALUE]: TestimonyDetailsComponent,
  [TYPE_INFORMATION.ACTIVITY.VALUE]: ActivityDetailsComponent,
  [TYPE_INFORMATION.SLIDER.VALUE]: SliderDetailsComponent,
  [TYPE_INFORMATION.WORKSHOP.VALUE]: InitialWorkshopDetailsComponent,
  [TYPE_INFORMATION.SPECIAL_SPAN_ACTIVITY.VALUE]: SpecialActivityDetailsComponent,
  [TYPE_INFORMATION.YEARBOOK.VALUE]: YearbookDetailsComponent,
  [TYPE_INFORMATION.SPAN_PLANNING.VALUE]: SpanPlanningComponent,
  [TYPE_INFORMATION.PICTURES_SCHOOL_ACTIVTIES.VALUE]: PhotosSchoolDetailsComponent,
};

const TYPE_OPTIONS = Object.values(TYPE_INFORMATION).map((t) => ({ value: t.VALUE, title: t.LABEL }));
const USER_TYPE_OPTIONS = Object.values(USER_TYPE).map((t) => ({ value: t.VALUE, title: t.LABEL }));

const labelOf = (options: { value: string; title: string }[], value: string): string => {
  const option = options.find((o) => o.value === value);
  return option ? option.title : "";
};

@Component({
  selector: "app-requests-validate-information",
  templateUrl: "./requests-validate-information.component.html",
  styleUrls: ["./requests-validate-information.component.scss"],
})
export class RequestsValidateInformationComponent
  extends BaseTable
  implements OnInit, OnDestroy {
  source: RequestsServerDataSource;

  subscription: Subscription;
  actionSubscription: Subscription;
  loadingView = false;

  get loadingTable(): boolean {
    return !!(this.source && this.source.loading);
  }

  constructor(
    private store: Store,
    private toast: CustomToastrService,
    private router: ActivatedRoute,
    private serviceInformation: InformationRequestService,
    private helper: Utility,
    private modalService: BsModalService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private actions$: Actions,
    private notificationsService: NotificationsService
  ) {
    super();

    this.settings.actions = {
      columnTitle: "Acciones",
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' },
      ],
    };

    this.settings.pager = {
      display: true,
      perPage: 20,
    };

    this.settings.columns = {
      code: {
        title: "N° de la solicitud",
        type: "string",
      },
      project: {
        title: "ID del proyecto",
        type: "string",
        valuePrepareFunction: (row: any) => (row ? row.code : ""),
      },
      typeUser: {
        title: "Tipo de solicitante",
        type: "text",
        sort: false,
        valuePrepareFunction: (row: any) => labelOf(USER_TYPE_OPTIONS, row),
        filter: {
          type: "list",
          config: { selectText: "Todos", list: USER_TYPE_OPTIONS },
        },
      },
      user: {
        title: "Solicitante",
        type: "string",
        sort: false,
        valuePrepareFunction: (row: any) => (row ? row.name : ""),
      },
      type: {
        title: "Tipo de información",
        type: "text",
        valuePrepareFunction: (row: any) => labelOf(TYPE_OPTIONS, row),
        filter: {
          type: "list",
          config: { selectText: "Todos", list: TYPE_OPTIONS },
        },
      },
      updatedAt: {
        title: "Fecha",
        type: "string",
        filter: false,
        valuePrepareFunction: (lastLoginTime: any) => {
          return new DatePipe("es-VE").transform(
            lastLoginTime,
            "dd/MM/yyyy h:mm:ss a"
          );
        },
      },
      status: {
        title: "Estatus",
        type: "text ",
        valuePrepareFunction: (row: any) => {
          return this.helper.readlyRequestStatus(row);
        }
      },
    };

    this.validateAction(
      false,
      !new AuthService().isAllowed(ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_DELETE)
    );
  }

  ngOnInit() {
    this.source = new RequestsServerDataSource(this.httpClient, {
      endPoint: environment.api + "requestscontentapproval",
      dataKey: "records",
      totalKey: "pagination.total_records",
      pagerPageKey: "page",
      pagerLimitKey: "per_page",
      filterFieldKey: "#field#",
      paginationMessage: "Mostrando de {from} a {to} de {total} registros",
    }, this.authService);

    this.router.params.subscribe((query: any) => {
      if (Object.keys(query).length && query.id) {
        this.store.dispatch(new GetRequestContentById(query.id)).subscribe(() => {
          const selected = this.store.selectSnapshot(RequestContentState.selectedContentRequest);
          if (selected && selected.type) {
            this.showModalDetails(selected.type);
          }
        });
      }
    });

    this.actionSubscription = this.actions$.pipe(ofActionSuccessful(UpdateRequestContent, DeleteRequestContent)).subscribe(() => {
      this.source.refresh();
      this.notificationsService.updateNotifications();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  private showModalDetails(type: string): void {
    const component = DETAIL_COMPONENTS[type];
    if (!component) {
      return;
    }

    this.modalService.show(
      component,
      Object.assign({}, { class: "modal-xl modal-dialog-centered" })
    );

    this.modalService.onHide.pipe(take(1)).subscribe(() => {
      this.store.dispatch(new ClearSelectedRequestContent());
    });
  }

  onAction(event) {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.loadingView = true;
        this.store.dispatch(new GetRequestContentById(event.data.id)).subscribe(
          () => {
            this.loadingView = false;
            this.showModalDetails(event.data.type);
          },
          (err) => {
            this.loadingView = false;
            console.error('Error al cargar la solicitud', err);
          }
        );
        break;
      case this.ACTION.DELETE:
        // Call delete modal
        // -- Instance delete

        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: "modal-dialog-centered" })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          "Eliminar solicitud de validación de información",
          "¿Desea eliminar la solictud seleccionada?"
        );

        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = (
          modal.content as DialogConfirmationComponent
        ).onClose.subscribe((result) => {
          if (result === true) {
            this.serviceInformation
              .deleteRequestContentApproval(event.data.id)
              .subscribe(
                () => {
                  (
                    modal.content as DialogConfirmationComponent
                  ).hideConfirmationModal();

                  // The table refresh is triggered by actionSubscription
                  this.store.dispatch(new DeleteRequestContent(event.data.id));
                  this.toast.deleteRegister(
                    "Solicitud eliminada",
                    "Se ha eliminado una solicitud"
                  );
                },
                (err: any) => {
                  (modal.content as DialogConfirmationComponent).errorDelete(
                    err
                  );
                }
              );
          }
        });

        break;
    }
  }
}
