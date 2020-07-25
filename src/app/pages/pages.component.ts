import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MenuSetUp } from './pages-menu-service';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements AfterViewInit, OnDestroy {
  constructor(public menuSetUp: MenuSetUp) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.menuSetUp.renderMenu();
    });
  }

  ngOnDestroy(): void {
    if (this.menuSetUp.subscriptionLapse) {
      this.menuSetUp.subscriptionLapse.unsubscribe();
    }
  }
}
