import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthSimpleToken } from '@nebular/auth';
import { NbAlertModule, NbCheckboxModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,

    /**
     * Login strategy
     */
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://reqres.in',
          token: {
            class: NbAuthSimpleToken,
            key: 'token'
          },
          login: {
            endpoint: '/api/login',
            method: 'post',
            redirect: {
              success: '/pages',
              failure: null
            }
          },
        })
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          email: {
            required: true,
          },
        },
      }
    }),
  ]
})
export class AuthModule { }
