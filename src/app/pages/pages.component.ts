import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthService } from '@nebular/auth';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
@Component({
    selector: 'app-pages',
    templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit {

    // Call menu options
    menu = MENU_ITEMS;
    
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


    ngOnInit() { }
}
