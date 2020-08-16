import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { NbDialogRef } from '@nebular/theme';
import {
  ProjectValidationRequestState,
  UpdateProjectValidationRequest,
} from 'src/app/store/request/project-validation-request.action';
import { Observable, Subscription } from 'rxjs';
import { ProjectValidationRequestService } from 'src/app/services/request/project-validate-request.service';
import { ProjectValidationRequest } from 'src/app/_models/request/project-validate-request.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { GetProjects } from 'src/app/store/project.action';
import { GetGeneralEnrolled } from 'src/app/store/_enrolled/enrolled.action';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss'],
})
export class InformationDetailsComponent implements OnInit, OnDestroy {
  @Select(ProjectValidationRequestState.selectedProjectValidateRequest)
  data$: Observable<ProjectValidationRequest>;
  subscription: Subscription;

  public canEdit = new AuthService().isAllowed(
    ALL_ACTIONS.REQUEST_PROJECT_APPROVAL_EDIT
  );

  statusSelected = '2';
  confirmAction = true;
  prepareData: ProjectValidationRequest;
  showProgress = false;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    private projectValidateRequestService: ProjectValidationRequestService,
    protected dialogRef: NbDialogRef<InformationDetailsComponent>
  ) {}

  ngOnInit() {
    this.subscription = this.data$.subscribe(
      (response) => (this.prepareData = response)
    );
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onApprovedRequest() {
    this.showProgress = true;

    this.projectValidateRequestService
      .updateRequestProjectApproval({
        ...this.prepareData,
        status: this.statusSelected,
      })
      .subscribe((response: any) => {
        setTimeout(() => {
          this.showProgress = false;

          if (this.statusSelected === '3') {
            this.toastr.updateSuccess(
              'Solicitud de confirmación',
              'Se ha rechazado la solicitud'
            );
          } else {
            this.toastr.updateSuccess(
              'Solicitud de confirmación',
              'Confirmar acción, al aprobar esta solicitud el proyecto estará disponible para ser inscrito en el año escolar'
            );
          }

          // -- Update table proyects, phase of proyect
          this.store.dispatch(new GetProjects());
          // -- Update school year school, to add
          this.store.dispatch(new GetGeneralEnrolled());

          this.store.dispatch(
            new UpdateProjectValidationRequest({
              ...this.prepareData,
              status: this.statusSelected,
            })
          );
        }, 2500);
      });
  }
}
