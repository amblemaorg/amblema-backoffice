import { NgModule, PLATFORM_INITIALIZER, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbTokenStorage,
  NbTokenLocalStorage,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';
import {
  NbAlertModule,
  NbCheckboxModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RequestPasswordComponent } from './request-password/request-password.component';

import { AuthStoreInterceptor } from '../_intercepts/auth-store-interceptor';

@NgModule({
  declarations: [LoginComponent, RequestPasswordComponent],
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
          baseEndpoint: `${environment.api}`,
          token: {
            class: NbAuthJWTToken,
            key: 'access_token',
          },
          refreshToken: {
            endpoint: 'auth/refresh',
            method: 'post'
          },
          login: {
            endpoint: 'auth/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
            defaultErrors: [
              'La combinación de inicio de sesión / correo electrónico no es correcta, intente nuevamente.',
            ],
            defaultMessages: ['Has ingresado exitosamente.'],
          },
          requestPass: {
            endpoint: 'auth/passwordrecovery',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
            defaultErrors: ['Algo salió mal. Por favor, vuelva a intentarlo.'],
            defaultMessages: [
              'Las instrucciones para restablecer la contraseña se han enviado a su correo electrónico.',
            ],
          },
        }),
      ],
      forms: {
        requestPassword: {
          redirectDelay: 2500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email', // strategy id key.
          rememberMe: true, // whether to show or not the `rememberMe` checkbox
          showMessages: {
            // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        validation: {
          password: {
            required: true,
            minLength: 8,
            maxLength: 8,
          },
          email: {
            required: true,
          },
        },
      },
    }),
  ],
  providers: [
    {
      provide: NbTokenStorage,
      useClass: NbTokenLocalStorage,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthStoreInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
