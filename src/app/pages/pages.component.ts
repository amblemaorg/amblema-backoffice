import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { MenuSetUp } from './pages-menu-service';

@Component({
    selector: 'app-pages',
    templateUrl: 'pages.component.html'
})

export class PagesComponent implements AfterViewInit, OnDestroy {

    constructor(
        public menuSetUp: MenuSetUp,
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

    ngAfterViewInit() {
        setTimeout(() => {
            this.menuSetUp.renderMenu();
        }, 500);
    }

    ngOnDestroy(): void {
        if (this.menuSetUp.subscriptionLapse) {
            this.menuSetUp.subscriptionLapse.unsubscribe();
        }

    }
}
