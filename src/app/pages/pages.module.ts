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
  NbSelectModule} from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { IdentificationDocumentComponent } from './forms/components/identification-document/identification-document.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    DashboardLayoutComponent,
    ProfileComponent,
    UserFormComponent,
    IdentificationDocumentComponent,
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
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ]
})
export class PagesModule { }
