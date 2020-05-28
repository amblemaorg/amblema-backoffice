import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { NbDialogRef } from '@nebular/theme';
import { ProjectValidationRequestState } from 'src/app/store/request/project-validation-request.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit {

  @Select( ProjectValidationRequestState.selectedProjectValidateRequest ) data$: Observable<ProjectValidationRequestState>; 

  statusSelected = '2';
  confirmAction = true;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    protected dialogRef: NbDialogRef<InformationDetailsComponent>
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
