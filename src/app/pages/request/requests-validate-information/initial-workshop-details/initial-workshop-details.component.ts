import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, Observable } from 'rxjs';
import {
  RequestContentState,
  UpdateRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import { Select, Store } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-initial-workshop-details',
  templateUrl: './initial-workshop-details.component.html',
  styleUrls: ['./initial-workshop-details.component.scss'],
})
export class InitialWorkshopDetailsComponent implements OnInit, OnDestroy {
  @Select(RequestContentState.selectedContentRequest) data$: Observable<{
    any;
  }>;
  subscription: Subscription;

  data: any;
  statusSelected = '2';
  confirmAction = true;
  comment;

  customOptions: OwlOptions = {
    stagePadding: 50,

    autoHeight: true,
    margin: 70,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  show = false;
  hasClass(el: any) {
    return (
      el.getAttribute('class') &&
      el.getAttribute('class').indexOf('show') !== -1
    );
  }

  constructor(
    protected serviceRequestStepApproval?: InformationRequestService,
    protected store?: Store,
    protected toastr?: CustomToastrService
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

  onApprovedRequest() {
    this.subscription = this.serviceRequestStepApproval
      .updateRequestContentApproval({
        ...this.data,
        status: this.statusSelected,
        comments: this.comment,
      })
      .subscribe((res) => {
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
      });
  }
}
