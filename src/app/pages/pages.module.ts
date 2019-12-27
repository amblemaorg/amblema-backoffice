import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './pages-routing.module';
import { NbTokenStorage, NbTokenLocalStorage, NbAuthModule } from '@nebular/auth';
import { HttpClientModule } from '@angular/common/http';
import { NbLayoutModule, NbSidebarModule, NbIconModule, NbActionsModule, NbUserModule, NbMenuModule } from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './layouts/profile/profile.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    DashboardLayoutComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule,
    DashboardRoutingModule,
    CommonModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbAuthModule.forRoot({}),
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule.forRoot()
  ],
  providers: [
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ]
})
export class PagesModule { }
