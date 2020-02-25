import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbToastrModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthGuard } from './guards/auth.guard';
import { NbAuthModule } from '@nebular/auth';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { RolesState, RoleState } from './store/role.action';
import { Utility } from './helpers/utility';
import { LearningState } from './store/learning.action';
import { WebHomeState } from './store/web-home.action';
import { CustomToastrService } from './services/custom-toastr.service';
import { WebAboutState } from './store/web-about.action';
import { WebSponsorState } from './store/web-sponsor.action';
import { WebCoordinatorState } from './store/web-coordinator.action';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot(),
    HttpClientModule,
    NbMenuModule.forRoot(),

    // NGXS
    NgxsModule.forRoot( [
      // RECUERDA REFACTORIZAR EL
      // MANEJADOR DE ESTADO DE ROLES
      RolesState,
      RoleState,

      // REFACTORIZACION DE FACTO
      LearningState,

      WebHomeState,
      WebAboutState,
      WebSponsorState,
      WebCoordinatorState
    ], { developmentMode: true }),
    NgxsStoragePluginModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [
    CustomToastrService,
    AuthGuard,

    // Custom helper
    Utility,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
