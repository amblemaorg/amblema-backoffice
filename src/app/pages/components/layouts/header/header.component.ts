import { Component, OnInit, OnDestroy } from "@angular/core";
import { NbSidebarService, NbMenuService } from "@nebular/theme";
import { Subscription, Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { ProjectRequestState } from "src/app/store/request/project-requests.action";
import { UserCreationRequestState } from "src/app/store/request/user-creation-request.action";
import { ProjectValidationRequestState } from "src/app/store/request/project-validation-request.action";
import { RequestContentState } from "src/app/store/request/request-content-approval.action";

import { REQUEST_STATUS } from "src/app/helpers/convention/request-status";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
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

  items = [{ title: "Profile" }, { title: "Log out" }];
  notifications = new Array<any>();

  constructor(
    private menuService: NbMenuService,
    protected sidebarService?: NbSidebarService
  ) {}

  ngOnInit(): void {
    /**
     * Push notifications
     */

    this.subscription = this.projectRequest$.subscribe((response) => {
      if (response.length) {
        response.forEach((value) => {
          if (value.status === REQUEST_STATUS.PENDING.CODE) {
            this.notifications = this.notifications.concat(value);
          }
        });
      }

      
    });

    this.subscription = this.menuService
      .onItemSelect()
      .subscribe((event: { tag: string; item: any }) => {
        if (window.innerWidth < 1200) {
          this.sidebarService.compact("menu-sidebar");
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }
}

interface Notification {
  name?: string;
  date?: string;
  id: string;
}
