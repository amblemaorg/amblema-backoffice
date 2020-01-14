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
import {
  IdDocumentComponent
} from './forms/reactive-form-components/id-document/id-document.component';
import { ReactiveInputComponent } from './forms/reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from './forms/reactive-form-components/reactive-validation/reactive-validation.component';
import { TestFormComponent } from './forms/test-form/test-form.component';
import { AdminUsersLayoutComponent } from './layouts/admin-users-layout/admin-users-layout.component';
import { ModalComponent } from './components/modal/modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TableBaseComponent } from './components/table/table-base/table-base.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { JwtPaginationComponent } from './components/jwt-pagination/jwt-pagination.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    DashboardLayoutComponent,
    ProfileComponent,
    IdDocumentComponent,
    ReactiveInputComponent,
    ReactiveValidationComponent,
    TestFormComponent,
    AdminUsersLayoutComponent,
    ModalComponent,
    TableBaseComponent,
    JwtPaginationComponent,
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
    Ng2TableModule,
    FormsModule,
    Ng2SmartTableModule,
  ],
  providers: [
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ]
})
export class PagesModule { }
