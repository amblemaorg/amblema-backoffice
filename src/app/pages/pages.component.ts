import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthService } from '@nebular/auth';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { LapseActivityState, LapseActivityModel } from '../store/lapse-activities.action';
import { LapseActivity } from '../models/lapse-activities.model';
import { takeWhile, take } from 'rxjs/operators';
@Component({
    selector: 'app-pages',
    templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit, OnDestroy {

    /**
     * The following variables or functions are created
     * with the purpose of generating a dynamic menu.
     * This snippet of code should be located elsewhere.
     */

    /* Call menu options */

    menu = MENU_ITEMS;

    /* Base route of lapses */

    private readonly ROUTE_LAPSE = `/pages/content/peca-setting/lapse`;

    /* State */

    @Select(LapseActivityState.LapseActivity) lapses$: Observable<LapseActivityModel>;
    subscriptionLapse: Subscription;

    constructor(
        private authService: NbAuthService,
        private router: Router) {

        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });

    }

    loading = false;

        

    ngOnDestroy(): void {
        if (this.subscriptionLapse) {
            this.subscriptionLapse.unsubscribe();
        }
    }
}
