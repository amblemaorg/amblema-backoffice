import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MenuSetUp } from './pages-menu-service';
import { AuthService } from '../services/user/auth.service';
import { Store } from '@ngxs/store';
import { GetLapActivities } from '../store/lapse-activities.action';
import { GetSchoolYearsEnrolled } from '../store/_enrolled/school-year-enrolled.action';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
})
export class PagesComponent implements AfterViewInit, OnDestroy {

  constructor(
    public authService: AuthService,
    public menuSetUp: MenuSetUp,
    private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetLapActivities());
    this.store.dispatch(new GetSchoolYearsEnrolled());
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
