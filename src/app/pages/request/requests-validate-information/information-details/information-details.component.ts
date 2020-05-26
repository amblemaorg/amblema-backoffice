import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.scss']
})
export class InformationDetailsComponent implements OnInit {

  @Input() data: any;

  constructor( protected dialogRef: NbDialogRef<InformationDetailsComponent> ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
