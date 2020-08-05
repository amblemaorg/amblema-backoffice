import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MenuSetUp } from './pages-menu-service';
import { AuthService } from '../services/user/auth.service';


@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements AfterViewInit, OnDestroy {

  constructor(
    public authService: AuthService,
    public menuSetUp: MenuSetUp) {
  }

  async ngAfterViewInit() {
    await this.menuSetUp.renderMenu(true);
    await this.menuSetUp.validateActions();
  }

  ngOnDestroy(): void {
    if (this.menuSetUp.subscriptionLapse) {
      this.menuSetUp.subscriptionLapse.unsubscribe();
    }
  }
}
