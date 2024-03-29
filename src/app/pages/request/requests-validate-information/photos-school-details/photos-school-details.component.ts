import { Component, OnInit, AfterViewInit } from '@angular/core';

import { InformationDetailsComponent } from '../information-details/information-details.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-photos-school-details',
  templateUrl: './photos-school-details.component.html',
  styleUrls: ['./photos-school-details.component.scss'],
})
export class PhotosSchoolDetailsComponent extends InformationDetailsComponent
  implements AfterViewInit {


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

  ngAfterViewInit() {
    setTimeout(() => (this.show = true));

    this.subscription = this.data$.subscribe((response) => {
      this.data = response;
    });
  }
}
