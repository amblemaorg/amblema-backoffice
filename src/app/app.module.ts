import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';
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
      WebHomeState
    ], { developmentMode: true }),
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [
    AuthGuard,

    // Custom helper
    Utility
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
