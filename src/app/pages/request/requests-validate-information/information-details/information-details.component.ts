import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  RequestContentState,
  UpdateRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss'],
})
export class InformationDetailsComponent implements OnInit, OnDestroy {
  @Select(RequestContentState.selectedContentRequest) data$: Observable<{
    any;
  }>;
  subscription: Subscription;

  data: any;
  statusSelected = '2';
  confirmAction = true;
  comment;

  public showProgress = false;
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_PROJECT_APPROVAL_EDIT );

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    public elem: ElementRef,
    public serviceRequestStepApproval?: InformationRequestService,
    public store?: Store,
    public toastr?: CustomToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.data$.subscribe((response) => {
      this.data = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose() {
    this.bsModalRef.hide();
  }

  onApprovedRequest( ) {
    this.showProgress = true;

    console.log( this.data );
    this.subscription = this.serviceRequestStepApproval
      .updateRequestContentApproval({
        ...this.data,
        status: this.statusSelected,
        comments: this.comment,
      })
      .subscribe((resp: HttpEvent<any>) => {
        setTimeout(() => {
          this.store.dispatch(
            new UpdateRequestContent({
              ...this.data,
              status: this.statusSelected,
              comments: this.comment,
            })
          );
          this.toastr.updateSuccess(
            'Estatus actualizado',
            'Se ha cambiado el estatus de la solicitud'
          );
        }, 2500);
      });
  }
}
