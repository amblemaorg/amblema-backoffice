import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { ALL_ACTIONS } from '../store/_shader/all-actions';

/**
 * Vademécum (BO-01): solo con la acción VADEMECUM_ADMIN en el rol.
 * La API valida lo mismo; esto evita mostrar pantallas que responderían 403.
 */
@Injectable({
  providedIn: 'root',
})
export class VademecumGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.authService.isAllowed(ALL_ACTIONS.VADEMECUM_ADMIN)
      ? true
      : this.router.parseUrl('/pages/dashboard');
  }
}
