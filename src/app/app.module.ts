import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ApplicationInitStatus } from '@angular/core';

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
import { NgxMaskModule } from 'ngx-mask';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { Utility } from './_helpers/utility';
import { LearningState } from './store/learning.action';
import { WebHomeState } from './store/web-content/web-home.action';
import { CustomToastrService } from './services/helper/custom-toastr.service';
import { WebAboutState } from './store/web-content/web-about.action';
import { WebSponsorState } from './store/web-content/web-sponsor.action';
import { WebCoordinatorState } from './store/web-content/web-coordinator.action';
import { PostsState } from './store/web-content/blog.action';

import localeVe from '@angular/common/locales/es-VE';
import { registerLocaleData } from '@angular/common';
import { AdminUserState } from './store/user/admin-user.action';
import { environment } from 'src/environments/environment.prod';
import { CoordinatorUserState } from './store/user/coordinator-user.action';
import { SponsorUserState } from './store/user/sponsor-user.action';
import { SchoolUserState } from './store/user/school-user.action';
import { ProjectState } from './store/project.action';
import { StepState } from './store/step.action';
import { LapseActivityState } from './store/lapse-activities.action';
import { ProjectRequestState } from './store/request/project-requests.action';
import { RolesState } from './store/role.action';
import { LoadingInterceptorService } from './_intercepts/loading-interceptor';
import { UserCreationRequestState } from './store/request/user-creation-request.action';
import { EnvironmentalProjectState } from './store/environmental-project.action';
import { RequestContentState } from './store/request/request-content-approval.action';
import { ProjectValidationRequestState } from './store/request/project-validation-request.action';
import { GeneralEnrolledState } from './store/_enrolled/enrolled.action';
import { SchoolYearEnrolledState } from './store/_enrolled/school-year-enrolled.action';
import { AddressState } from './store/_address/address.action';
import { AuthModule } from './auth/auth.module';
import { AuthJWTInterceptor } from './_intercepts/auth-jwt-interceptor';

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

  ],
  providers: [
    CustomToastrService,
    AuthGuard,

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
