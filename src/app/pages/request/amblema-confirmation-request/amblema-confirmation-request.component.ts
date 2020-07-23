import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { Store, Select } from '@ngxs/store';
import {
  ProjectValidationRequestState,
  DeleteProjectValidationRequest,
  SelectedProjectValidationRequestn,
} from 'src/app/store/request/project-validation-request.action';
import { Observable, Subscription } from 'rxjs';
import { ProjectValidationRequest } from 'src/app/_models/request/project-validate-request.model';
import { AmblemaConfirmation } from './_shared/amblema-confirmation.model';
import { Utility } from 'src/app/_helpers/utility';
import { REQUEST_STATUS } from 'src/app/_helpers/convention/request-status';
import { NbDialogService } from '@nebular/theme';
import { InformationDetailsComponent } from './_shared/information-details/information-details.component';
import { ProjectValidationRequestService } from 'src/app/services/request/project-validate-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from '../../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-amblema-confirmation-request',
  templateUrl: './amblema-confirmation-request.component.html',
  styleUrls: ['./amblema-confirmation-request.component.scss'],
})
export class AmblemaConfirmationRequestComponent extends BaseTable
  implements OnInit, OnDestroy {
  @Select(ProjectValidationRequestState.projectValidationRequest)
  data$: Observable<ProjectValidationRequest[]>;

  subscriptionService: Subscription;

  prepareData = new Array<AmblemaConfirmation>();

  constructor(
    private modalServicesBs: BsModalService,
    private projectValidationRequestService: ProjectValidationRequestService,
    private dialogService: NbDialogService,
    private helper: Utility,
    private router: ActivatedRoute,
    private store: Store,
    private toastr: CustomToastrService
  ) {
    super();

    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: this.ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
        { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
      ],
    };

    // N° de la solicitud, Id del proyecto, Padrino, coordinador, escuela, estatus

    this.settings.columns = {
      code: {
        title: 'N° de la solicitud',
        type: 'string',
      },
      codeProject: {
        title: 'Id del proyecto',
        type: 'string',
      },
      coordinator: {
        title: 'Coordinador',
        type: 'string',
      },
      sponsor: {
        title: 'Padrino',
        type: 'string',
      },
      school: {
        title: 'Escuela',
        type: 'string',
      },
      status: {
        title: 'Estatus',
        type: 'string',
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
    };
  }

  ngOnInit() {
    this.router.params.subscribe((query: any) => {
      if (Object.keys(query).length) {
        this.subscriptionService = this.data$.subscribe((response) => {
          this.store.dispatch(
            new SelectedProjectValidationRequestn(
              response.find((item) => item.id === query.id)
            )
          );
        });

        this.dialogService.open(InformationDetailsComponent);
      }
    });

    this.subscriptionService = this.data$.subscribe((response) => {
      this.prepareData = [];

      response.forEach((value) => {
        this.prepareData.push({
          id: value.id,
          code: value.code,
          codeProject: value.project.code,
          coordinator: value.project.coordinator.name,
          sponsor: value.project.sponsor.name,
          school: value.project.school.name,
          status: value.status,
        });
      });
      this.source.reset();
      this.source.refresh();
      this.source.load(this.prepareData);
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onAction(event) {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.subscriptionService = this.data$.subscribe((response) => {
          this.store.dispatch(
            new SelectedProjectValidationRequestn(
              response.find((item) => item.id === event.data.id)
            )
          );
        });

        this.dialogService.open(InformationDetailsComponent);
        break;
      case this.ACTION.DELETE:
        // -- Instance delete

        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar solicitud de confirmación de pasos',
          '¿Desea eliminar la solicitud seleccionada?'
        );

        this.subscriptionService = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.projectValidationRequestService

                .deleteRequestProjectApproval(event.data.id)
                .subscribe(
                  (response) => {
                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                    this.store.dispatch(
                      new DeleteProjectValidationRequest(event.data.id)
                    );
                    this.toastr.deleteRegister(
                      'Solicitud eliminada',
                      'Se ha eliminado una solicitud'
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
        );

        break;
    }
  }
}
