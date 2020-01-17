import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './pages-routing.module';
import { NbTokenStorage, NbTokenLocalStorage, NbAuthModule } from '@nebular/auth';
import { HttpClientModule } from '@angular/common/http';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbIconModule,
  NbActionsModule,
  NbUserModule,
  NbMenuModule,
  NbContextMenuModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule, } from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    RouterModule,
    DashboardRoutingModule,
    CommonModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbAuthModule.forRoot({}),
    NbCardModule,
    NbIconModule,
    NbActionsModule,
    NbInputModule,
    NbSelectModule,
    NbUserModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
  ],
  exports: [ NbIconModule ],
  providers: [
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ]
})
export class PagesModule { }
