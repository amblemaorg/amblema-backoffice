import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit {

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
