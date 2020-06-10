import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-content',
  template: `<router-outlet></router-outlet>`,
})
export class WebContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
