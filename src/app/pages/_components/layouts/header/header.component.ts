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
import { Subscription, Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { filter, map, startWith, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // All notifications
  allNotifications$: Observable<any[]> = of([]);

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
    private store: Store,
    private notificationsService: NotificationsService,
    protected sidebarService?: NbSidebarService
  ) { }

  ngOnInit() {

    // -- Obtener Notificaciones Pendientes --
    this.allNotifications$ = this.notificationsService.getPendingNotifications().pipe(
      map(res => res.records),
      startWith([]),
      shareReplay(1)
    );

    /* To the user menu */
    this.subscription = this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'user-menu'),
      map(({ item: { title } }) => {

        if (title === 'Cerrar sesión') {
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
        this.router.navigate(['/pages/requests/project-requests', { id: item.id }]);

        break;
      // Creation user
      case '2':
        this.router.navigate(['/pages/requests/creation-requests', { id: item.id }]);
        break;
      // Project validate
      case '3':
        this.router.navigate([
          '/pages/requests/amblema-confirmation-request',
          { id: item.id },
        ]);

        break;
      // Content validate
      case '4':
        this.router.navigate([
          '/pages/requests/requests-validate-information',
          { id: item.id },
        ]);

        break;
    }
  }
}
