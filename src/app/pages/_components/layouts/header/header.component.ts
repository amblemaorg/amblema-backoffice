import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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
import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // All notifications
  @Select(ProjectRequestState.allRequest) allNotifications$: Observable<any>;

  subscription: Subscription;

  items = [{ title: 'Cerrar sesión' }];

  notifications = new Array<any>();

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(
    private router: Router,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private authServiceCustom: AuthService,
    private tokenService: NbTokenService,
    protected sidebarService?: NbSidebarService
  ) {}

  ngOnInit() {

    /* To the user menu */
    this.subscription = this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'user-menu'),
      map(({ item: { title } }) => {

        if ( title === 'Cerrar sesión' ) {
          this.tokenService.clear();
          localStorage.clear();
          sessionStorage.clear();
          this.authServiceCustom.removeTokens();
          this.router.navigate(['auth/login']);
        }

      })
    ).subscribe();

    /* For the sidebar menu, to void Shaked */
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

  onSelectNotification(item: any, define: string): void {
    define = define.toString();

    this.popover.hide();

    switch (define) {
      // Creation project
      case '1':
        this.router.navigate(['/pages/requests/project-requests', { item: JSON.stringify(item) }]);

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
