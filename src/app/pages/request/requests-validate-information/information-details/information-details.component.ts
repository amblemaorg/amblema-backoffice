import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RequestStepApprovalState } from 'src/app/store/request/request-step-approval.action';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit, OnDestroy {

  @Select( RequestStepApprovalState.selectedRequest ) data$: Observable<{any}>; 
  subscription: Subscription;

  data:any;
  statusSelected = '2';
  confirmAction = true;

  constructor( protected dialogRef: NbDialogRef<InformationDetailsComponent> ) { }

  ngOnInit() {

    this.subscription = this.data$.subscribe( response => { console.log(response);  this.data = response} )
  }

  ngOnDestroy(): void {
    if( this.subscription )
      this.subscription.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
