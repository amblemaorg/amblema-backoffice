import { Component, OnInit, OnDestroy } from "@angular/core";
import { NbSidebarService, NbMenuService } from "@nebular/theme";
import { Subscription, Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { ProjectRequestState } from "src/app/store/request/project-requests.action";
import { UserCreationRequestState } from "src/app/store/request/user-creation-request.action";
import { ProjectValidationRequestState } from "src/app/store/request/project-validation-request.action";
import { RequestContentState } from "src/app/store/request/request-content-approval.action";
import { ConsoleReporter } from 'jasmine';
import { take } from 'rxjs/operators';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Get all notifications
   */
  @Select(ProjectRequestState.projectRquests) projectRequest$: Observable<any[]>;
  @Select(UserCreationRequestState.creationRequests) createRequest$: Observable<
    any
  >;
  @Select(ProjectValidationRequestState) projectValidationRequest$: Observable<
    any
  >;
  @Select(RequestContentState.requestsContent) requestContent$: Observable<any>;

  subscription: Subscription;

  items = [{ title: "Profile" }, { title: "Log out" }];
  notifications: any[] = [];

  constructor(
    private menuService: NbMenuService,
    protected sidebarService?: NbSidebarService
  ) {}

  ngOnInit(): void {
    /**
     * Push notifactions
     */
    this.subscription = this.projectRequest$.pipe(take(1)).subscribe( response => {
      console.log( response.length )
      if( response.length ) 
        this.notifications.push( response )

    } )

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
