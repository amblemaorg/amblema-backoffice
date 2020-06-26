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
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { InformationDetailsComponent } from '../information-details/information-details.component';

@Component({
  selector: 'app-initial-workshop-details',
  templateUrl: './initial-workshop-details.component.html',
  styleUrls: ['./initial-workshop-details.component.scss'],
})
export class InitialWorkshopDetailsComponent extends InformationDetailsComponent {
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

  public hasClass(el: any) {
    return (
      el.getAttribute('class') &&
      el.getAttribute('class').indexOf('show') !== -1
    );
  }
}
