import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MenuSetUp } from './pages-menu-service';
import { RolesState } from '../store/role.action';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements AfterViewInit, OnDestroy {

  constructor(public menuSetUp: MenuSetUp) {

    console.log(RolesState.getInstance().hello())

  }

  async ngAfterViewInit() {
    await this.menuSetUp.renderMenu(true);
  }

  ngOnDestroy(): void {
    if (this.menuSetUp.subscriptionLapse) {
      this.menuSetUp.subscriptionLapse.unsubscribe();
    }
  }
}
