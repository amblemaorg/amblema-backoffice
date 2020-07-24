import { MENU_ITEMS } from './pages-menu';
import { Select } from '@ngxs/store';
import { LapseActivityState } from '../store/lapse-activities.action';
import { Observable, Subscription } from 'rxjs';
import { LapseActivity } from '../_models/lapse-activities.model';
import { Injectable } from '@angular/core';
import { STATUS } from '../_helpers/convention/status';
import { first, take } from 'rxjs/operators';

@Injectable()
export class MenuSetUp {
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

  public async renderMenu(isUpdate: boolean = false) {
    /* Get the lapses and activities to configure the menu*/

    this.subscriptionLapse = await this.lapses$
      .pipe( take(1) )
      .subscribe((response) => {

        this.menu.find((value) => {
          /* Get in 'Contenido' option */
          if (value.title === 'Contenido') {
            /* Sub level options */
            value.children.find((children) => {
              /* Find the correct option */
              if (children.title === 'Ajustes del PECA') {
                /* Find laspes */
                children.children.find((lapses) => {
                  /**
                   * All standard and generic options begin to be created,
                   *  in order to create them they must be in active status
                   */

                  // Lapse 1
                  if (lapses.title === 'Lapso 1') {
                    if (isUpdate) {
                      lapses.children = [];
                    }

                    response.lapse1.find((option) => {
                      if (
                        option.status === STATUS.ACTIVE.VALUE
                        && option.devName !== 'initialWorkshop'
                      ) {
                        lapses.children.push({
                          title: option.name,
                          link: `${
                            this.ROUTE_LAPSE
                          }/${option.id.toLocaleLowerCase()}/1`,
                        });
                      }
                    });
                  }

                  // Lapse 2
                  if (lapses.title === 'Lapso 2') {
                    if (isUpdate) {
                      lapses.children = [];
                    }

                    response.lapse2.find((option) => {
                      // Add activity
                      if (
                        option.status === STATUS.ACTIVE.VALUE &&
                        option.devName !== 'initialWorkshop'
                      ) {
                        lapses.children.push({
                          title: option.name,
                          link: `${
                            this.ROUTE_LAPSE
                          }/${option.id.toLocaleLowerCase()}/2`,
                        });
                      }
                    });
                  }

                  // Lapse 3
                  if (lapses.title === 'Lapso 3') {
                    if (isUpdate) {
                      lapses.children = [];
                    }

                    response.lapse3.find((option) => {
                      // Add activity
                      if (
                        option.status === STATUS.ACTIVE.VALUE &&
                        option.devName !== 'initialWorkshop'
                      ) {
                        lapses.children.push({
                          title: option.name,
                          link: `${
                            this.ROUTE_LAPSE
                          }/${option.id.toLocaleLowerCase()}/3`,
                        });
                      }
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
  } // <-- End render menu
}
