import { MENU_ITEMS } from './pages-menu';
import { Select } from '@ngxs/store';
import { LapseActivityState } from '../store/lapse-activities.action';
import { Observable, Subscription } from 'rxjs';
import { LapseActivity } from '../_models/lapse-activities.model';
import { Injectable } from '@angular/core';
import { STATUS } from '../_helpers/convention/status';
import { AuthService } from '../services/user/auth.service';
import { ALL_ACTIONS } from '../store/_shader/all-actions';

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

  //  constructor( private authService: AuthService ) {}

  public async renderMenu(isUpdate: boolean = false) {
    /* Get the lapses and activities to configure the menu*/

    this.subscriptionLapse = await this.lapses$
      // .pipe( first() )
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
                        option.status === STATUS.ACTIVE.VALUE &&
                        option.devName !== 'initialWorkshop'
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

  public async validateActions() {
    /**
     * Validation menu view
     */

    // -- User admin and role --
    this.menu[1].children[0].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.ADMIN_VIEW
    );
    this.menu[1].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.ROLE_VIEW
    );

    // -- User school, sponsor and coordinator --
    this.menu[2].children[0].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.COORDINATOR_USER_VIEW
    );
    this.menu[2].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.SPONSOR_USER_VIEW
    );
    this.menu[2].children[2].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.SCHOOL_USER_VIEW
    );

    // -- Request project, creation user, validate info and validate step --
    this.menu[3].children[0].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_VIEW
    );
    this.menu[3].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REQUEST_FIND_USER_VIEW
    );
    this.menu[3].children[2].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_VIEW
    );
    this.menu[3].children[3].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REQUEST_PROJECT_APPROVAL_VIEW
    );

    /**
     * ============= / Start content ============
     */

    // -- Web --
    this.menu[4].children[0].children[0].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.HOME_PAGE_EDIT
    );
    this.menu[4].children[0].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.ABOUT_US_PAGE_EDIT
    );
    this.menu[4].children[0].children[2].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.SPONSOR_PAGE_EDIT
    );
    this.menu[4].children[0].children[3].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.COORDINATOR_PAGE_EDIT
    );
    this.menu[4].children[0].children[4].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.BLOG_PAGE_EDIT
    );

    /** Step  */

    this.menu[4].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.STEP_VIEW
    );

    /** Config PECA */

    // -- Config goal
    this.menu[4].children[2].children[3].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.GOAL_SETTING_VIEW
    );

    // -- Environment
    this.menu[4].children[2].children[4].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.ENVIRONMENTAL_PROJECT_VIEW
    );

    // -- Strategy activity
    this.menu[4].children[2].children[5].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.MONITORING_ACTIVITY_VIEW
    );

    // -- Lapse and school year
    this.menu[4].children[2].children[6].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.SCHOOL_YEAR_VIEW
    );

    /** / End config PECA */

    /** Pensum */

    this.menu[4].children[3].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.LEARNING_MODULE_VIEW
    );

    /**
     * ============= / End content ============
     */

    // -- Proyects --
    this.menu[5].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.PROJECT_VIEW
    );

    /**
     * Diagnosis
     * Godparents
     * Coordinators
     * Schools
     * Teachers
     * Olympics report.
     * Registered schools.
     * Godparents active - inactive.
     */

    this.menu[6].children[0].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_DIAGNOSTICS_VIEW
    );
    this.menu[6].children[1].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_SPONSORS_VIEW
    );
    this.menu[6].children[2].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_COORDINATOR_VIEW
    );
    this.menu[6].children[3].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_SCHOOL_VIEW
    );
    this.menu[6].children[4].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_TEACHER_VIEW
    );
    this.menu[6].children[5].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_OLYMPICS_VIEW
    );
    this.menu[6].children[6].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_ENROLLED_SCHOOLS_VIEW
    );
    this.menu[6].children[7].hidden = !new AuthService().isAllowed(
      ALL_ACTIONS.REPORT_SPONSOR_ACTIVES_VIEW
    );
  }
}
