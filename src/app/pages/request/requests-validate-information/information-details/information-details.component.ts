import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    public serviceRequestStepApproval?: InformationRequestService,
    public store?: Store,
    public toastr?: CustomToastrService,
    
    
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

  onApprovedRequest() {
    this.showProgress = true;
    this.subscription = this.serviceRequestStepApproval
      .updateRequestContentApproval({
        ...this.data,
        status: this.statusSelected,
        comments: this.comment,
      })
      .subscribe((resp: HttpEvent<any>) => {
        switch (resp.type) {
          case HttpEventType.Response:
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

            break;
        }
      });
  }
}
