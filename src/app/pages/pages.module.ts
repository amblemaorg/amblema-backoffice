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
  NbSelectModule,
  NbToastrModule,
  NbListModule,
  NbPopoverModule,
  NbBadgeModule, } from '@nebular/theme';
import { HeaderComponent } from './_components/layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CustomToastrService } from '../services/helper/custom-toastr.service';
import { MenuSetUp } from './pages-menu-service';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule,
    DashboardRoutingModule,

    CommonModule,
    NbListModule,
    NbPopoverModule,
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
    NbBadgeModule,
    NbToastrModule.forRoot()
  ],
  exports: [ NbIconModule ],
  providers: [
    MenuSetUp,
    CustomToastrService,
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ]
})
export class PagesModule { }
