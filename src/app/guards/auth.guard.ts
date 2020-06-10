import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: NbAuthService,
               private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) { // <-- Is not authenticated, then redirect to login
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }
      }),
    );
  }
}
