import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  NbSidebarService,
  NbMenuService,
  NbPopoverDirective,
} from '@nebular/theme';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProjectRequestState } from 'src/app/store/request/project-requests.action';
import { UserCreationRequestState } from 'src/app/store/request/user-creation-request.action';
import { ProjectValidationRequestState } from 'src/app/store/request/project-validation-request.action';
import { RequestContentState } from 'src/app/store/request/request-content-approval.action';

import { REQUEST_STATUS } from 'src/app/helpers/convention/request-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Get all notifications
   */
  @Select(ProjectRequestState.projectRquests) projectRequest$: Observable<
    any[]
  >;
  @Select(UserCreationRequestState.creationRequests) createRequest$: Observable<
    any[]
  >;
  @Select(ProjectValidationRequestState) projectValidationRequest$: Observable<
    any[]
  >;
  @Select(RequestContentState.requestsContent) requestContent$: Observable<any>;

  subscription: Subscription;

  items = [{ title: 'Profile' }, { title: 'Log out' }];
  notifications = new Array<any>();
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  constructor(
    private router: Router,
    private menuService: NbMenuService,
    protected sidebarService?: NbSidebarService
  ) {}

  ngOnInit(): void {
    /**
     * Push notifications
     */

    setTimeout(() => {
      // -- Type request one --
      this.subscription = this.projectRequest$.subscribe((projectRequest) => {
        if (projectRequest.length) {
          projectRequest.forEach((value) => {
            if (value.status === REQUEST_STATUS.PENDING.CODE) {
              value = {
                ...value,
                define: '1',
              };
              this.notifications = this.notifications.concat(value);
            }
          });
        }
      });
    });

    // -- Type request two --
    this.subscription = this.createRequest$.subscribe((creationRequest) => {
      if (creationRequest.length) {
        creationRequest.forEach((value) => {
          if (value.status === REQUEST_STATUS.PENDING.CODE) {
            value = {
              ...value,
              define: '2',
            };
            this.notifications = this.notifications.concat(value);
          }
        });
      }
    });

    // -- Type request three
    this.subscription = this.projectValidationRequest$.subscribe(
      (projectValidation) => {
        if (projectValidation.length) {
          projectValidation.forEach((value) => {
            if (value.status === REQUEST_STATUS.PENDING.CODE) {
              value = {
                ...value,
                define: '3',
              };
              this.notifications = this.notifications.concat(value);
            }
          });
        }
      }
    );

    // -- Type request four --
    this.subscription = this.requestContent$.subscribe((requestContent) => {
      if (requestContent.length) {
        requestContent.forEach((value) => {
          if (value.status === REQUEST_STATUS.PENDING.CODE) {
            value = {
              ...value,
              define: '4',
            };
            this.notifications = this.notifications.concat(value);
          }
        });
      }
    });

    this.subscription = this.menuService
      .onItemSelect()
      .subscribe((event: { tag: string; item: any }) => {
        if (window.innerWidth < 1200) {
          this.sidebarService.compact('menu-sidebar');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  onSelectNotification(item: any): void {
    this.popover.hide();

    switch (item.define) {
      // Creation project
      case '1':
        this.router.navigate(['/pages/requests/project-requests', item]);

        break;
      // Creation user
      case '2':
        this.router.navigate(['/pages/requests/creation-requests', item]);
        break;
      // Project validate
      case '3':
        this.router.navigate([
          '/pages/requests/amblema-confirmation-request',
          item,
        ]);

        break;
      // Content validate
      case '4':
        this.router.navigate([
          '/pages/requests/requests-validate-information',
          item,
        ]);

        break;
    }
  }
}

interface Notification {
  name?: string;
  date?: string;
  id: string;
}
