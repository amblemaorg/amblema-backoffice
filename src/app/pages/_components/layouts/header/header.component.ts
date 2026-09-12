import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NbSidebarService,
  NbMenuService,
  NbPopoverDirective,
} from '@nebular/theme';
import { Subscription, Observable, of } from 'rxjs';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { filter, map, startWith, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import {
  UpdateRequestContent,
  DeleteRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import {
  UpdateProjectRequests,
  DeleteProjectRequests,
} from 'src/app/store/request/project-requests.action';
import {
  UpdateUserCreationRequest,
  DeleteUserCreationRequest,
} from 'src/app/store/request/user-creation-request.action';
import {
  UpdateProjectValidationRequest,
  DeleteProjectValidationRequest,
} from 'src/app/store/request/project-validation-request.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // All notifications
  allNotifications$: Observable<any[]> = of([]);

  subscription: Subscription = new Subscription();

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
    private actions$: Actions,
    private cdr: ChangeDetectorRef,
    protected sidebarService?: NbSidebarService
  ) { }

  ngOnInit() {

    // -- Obtener Notificaciones Pendientes --
    this.allNotifications$ = this.notificationsService.getPendingNotifications().pipe(
      map(res => (res && res.records ? res.records : [])),
      startWith([]),
      tap(() => {
        this.cdr.markForCheck();
      }),
      shareReplay(1)
    );

    // Escuchar cualquier cambio de estatus o eliminación de solicitudes para refrescar notificaciones
    this.subscription.add(
      this.actions$
        .pipe(
          ofActionSuccessful(
            UpdateRequestContent,
            DeleteRequestContent,
            UpdateProjectRequests,
            DeleteProjectRequests,
            UpdateUserCreationRequest,
            DeleteUserCreationRequest,
            UpdateProjectValidationRequest,
            DeleteProjectValidationRequest
          )
        )
        .subscribe(() => {
          this.notificationsService.updateNotifications();
        })
    );

    /* To the user menu */
    this.subscription.add(
      this.menuService.onItemClick().pipe(
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
      ).subscribe()
    );

    /* For the sidebar menu, to void Shaked */
    this.subscription.add(
      this.menuService
        .onItemSelect()
        .subscribe((event: { tag: string; item: any }) => {
          if (window.innerWidth < 1200) {
            this.sidebarService.compact('menu-sidebar');
          }
        })
    );
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
