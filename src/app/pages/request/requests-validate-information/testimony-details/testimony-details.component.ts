import { Component, OnInit } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimony-details',
  templateUrl: './testimony-details.component.html',
  styleUrls: ['./testimony-details.component.scss'],

})
export class TestimonyDetailsComponent extends InformationDetailsComponent implements OnInit {

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
