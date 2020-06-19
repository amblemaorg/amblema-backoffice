import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { RequestPasswordComponent } from './request-password/request-password.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'request-password', component: RequestPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class AuthRoutingModule {}
