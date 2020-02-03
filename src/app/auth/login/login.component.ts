import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  // To hide somes links
  extraSetting = {
    signUp: false,
    forgotPassword: false
  };
}
