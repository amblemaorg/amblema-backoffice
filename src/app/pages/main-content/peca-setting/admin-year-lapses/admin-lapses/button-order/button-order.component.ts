import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { Store } from '@ngxs/store';
import { DeleteLapseActivity } from 'src/app/store/lapse-activities.action';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { MenuSetUp } from 'src/app/pages/pages-menu-service';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/helper/modal.service';

@Component({
  selector: 'app-button-order',
  templateUrl: './button-order.component.html',
  styleUrls: ['./button-order.component.scss'],
})
export class ButtonOrderComponent implements OnInit {
  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  constructor(
    public modal: ModalService,
    private menuService: MenuSetUp,
    private toastr: CustomToastrService,
    private store: Store,
    private lapseActivityService: LapseActivitiesService
  ) {}

  ngOnInit() {}

  onclick() {
    this.modal.open("modal-edit-activity");
  }
}
