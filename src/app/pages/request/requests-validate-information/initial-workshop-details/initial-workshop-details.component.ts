import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-workshop-details',
  templateUrl: './initial-workshop-details.component.html',
  styleUrls: ['./initial-workshop-details.component.scss'],
})
export class InitialWorkshopDetailsComponent implements OnInit {
  data = {

    // -- General data --

    project: {
      code: '222',
      sponsor: { name: 'Coca cola' },
      coordinator: { name: 'Juaquin' },
      school: { name: 'Sevallos' }
    },

    createdAt: '2020-06-02 20:38:23.499000',
    code: '000',


    // -- Details data --
    descripton: 'Lorem ',
    images: [
      {
        url: '',
        description: '',
        state: '',
        status: '',
      },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
