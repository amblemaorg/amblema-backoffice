import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import {
  NbLoginComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
  // To hide somes links
  extraSetting = {
    signUp: false,
    forgotPassword: false,
  };

  constructor(
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options: {},
    public cd: ChangeDetectorRef,
    public router: Router
  ) {
    super(service, options, cd, router);
    // Redict to home if are login data
    this.service.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.router.navigate(['pages/dashboard']);
      }
    });
  }
}
