import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthService } from '@nebular/auth';
@Component({
    selector: 'app-pages',
    templateUrl: 'pages.component.html'
})

export class PagesComponent implements OnInit {

    // Call menu options
    menu = MENU_ITEMS;
    constructor( private authService: NbAuthService ) {
    }

    ngOnInit() { }
}
