import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthGuard } from './_guards/auth.guard';
import { NbAuthModule } from '@nebular/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Utility } from './_helpers/utility';
import { CustomToastrService } from './services/helper/custom-toastr.service';

import localeVe from '@angular/common/locales/es-VE';
import { registerLocaleData } from '@angular/common';
import { LoadingInterceptorService } from './_intercepts/loading-interceptor';
import { AuthModule } from './auth/auth.module';
import { AuthJWTInterceptor } from './_intercepts/auth-jwt-interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from './pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { DialogModule } from './pages/_components/shared/dialog/dialog.module';
import { ThemeService } from 'ng2-charts';

registerLocaleData(localeVe, 'es-VE');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),

    ModalModule.forRoot(),
    DialogModule,
  ],
  entryComponents: [DialogConfirmationComponent],
  providers: [
    CustomToastrService,
    AuthGuard,
    ThemeService,
    // -- Custom Helper --
    Utility,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJWTInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
