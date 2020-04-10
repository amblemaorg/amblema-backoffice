import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NbAuthService } from '@nebular/auth';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { LapseActivityState } from '../store/lapse-activities.action';
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

    @Select(LapseActivityState.lapses) lapses$: Observable<LapseActivity>;
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

    async ngOnInit() {

        /* Get the lapses and activities to configure the menu*/

        this.subscriptionLapse = await this.lapses$.subscribe(response => {


            this.menu.find(value => {

                /* Get in 'Contenido' option */
                if (value.title === 'Contenido') {

                    /* Sub level options */
                    value.children.find(children => {

                        /* Find the correcto option */
                        if (children.title === 'Ajustes del PECA') {

                            /* Find laspes */
                            children.children.find(lapses => {

                                /**
                                 * All standard and generic options begin to be created,
                                 *  in order to create them they must be in active status
                                 */

                                // Lapse 1
                                if (lapses.title === 'Lapso 1') {


                                    response.lapse1.find(option => {
                                        lapses.children.push({
                                            title: option.name,
                                            link: `${this.ROUTE_LAPSE}/${option.devName.toLocaleLowerCase()}/1`
                                        });
                                    });
                                }

                            }); // End find lapses

                            return true;
                        }

                        return false;

                    }); // <-- End level options

                    return true;
                }
                return false;

            }); // <-- End menu

        }); // <-- End subscription
    } // <-- End OnInit

    ngOnDestroy(): void {
        if (this.subscriptionLapse) {
            this.subscriptionLapse.unsubscribe();
        }
    }
}
