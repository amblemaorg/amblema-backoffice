import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { RequestContentState, UpdateRequestContent } from 'src/app/store/request/request-content-approval.action';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit, OnDestroy {

  @Select( RequestContentState.selectedContentRequest ) data$: Observable<{any}>;
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

    this.subscription = this.serviceRequestStepApproval.updateRequestContentApproval(
      {
        ...this.data,
        status: this.statusSelected,
        comments: this.comment
      }
    ).subscribe( res => {
      this.store.dispatch( new UpdateRequestContent( { ...this.data, status: this.statusSelected, comments: this.comment } ) );
      this.toastr.updateSuccess('Estatus actualizado', 'Se ha cambiado el estatus de la solicitud');
    } );
  }
}
