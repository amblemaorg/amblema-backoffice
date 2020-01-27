import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  // To hide somes links
  extraSetting = {
    signUp: false,
    forgotPassword: false
  };

  ngOnInit(): void {

  }
}
