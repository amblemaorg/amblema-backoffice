import { Component, OnInit } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styles: []
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
  goToRegister = false;
}
