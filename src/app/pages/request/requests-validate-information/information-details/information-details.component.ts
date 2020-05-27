import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RequestStepApprovalState, UpdateRequestStepApproval } from 'src/app/store/request/request-step-approval.action';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit, OnDestroy {

  @Select( RequestStepApprovalState.selectedRequest ) data$: Observable<{any}>;
  subscription: Subscription;

  data: any;
  statusSelected = '2';
  confirmAction = true;
  comment;

  constructor(
    private serviceRequestStepApproval: InformationRequestService,
    private store: Store,
    private toastr: CustomToastrService,
    protected dialogRef: NbDialogRef<InformationDetailsComponent> ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => { console.log(response);  this.data = response; } );
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onApprovedRequest() {

    this.subscription = this.serviceRequestStepApproval.updateRequestStepApproval(
      {
        ...this.data,
        status: this.statusSelected,
        comments: this.comment
      }
    ).subscribe( res => {
      this.store.dispatch( new UpdateRequestStepApproval( { ...this.data, status: this.statusSelected, comments: this.comment } ) );
      this.toastr.updateSuccess('Estatus actualizado', 'Se ha cambiado el estatus de la solicitud');
    } );
  }
}
