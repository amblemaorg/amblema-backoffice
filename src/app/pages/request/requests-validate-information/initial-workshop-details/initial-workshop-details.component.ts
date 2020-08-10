import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-initial-workshop-details',
  templateUrl: './initial-workshop-details.component.html',
  styleUrls: ['./initial-workshop-details.component.scss'],
})
export class InitialWorkshopDetailsComponent extends InformationDetailsComponent
  implements OnInit {

    public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT );

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

  ngOnInit() {
    setTimeout(() => (this.show = true));
  }
}
