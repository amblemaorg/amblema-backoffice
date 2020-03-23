import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationRequestsComponent } from './creation-requests/creation-requests.component';


const routes: Routes = [
  {
    path: 'creation-requests',
    loadChildren: () => import('./creation-requests/creation-requests.module').
    then(m => m.CreationRequestsModule)
  },
  {
    path: 'project-requests',
    loadChildren: () => import('./project-requests/project-requests.module').
    then(m => m.ProjectRequestsModule)
  },
  {
    path: 'requests-validate-information',
    loadChildren: () => import('./requests-validate-information/requests-validate-information.module').
    then(m => m.RequestsValidateInformationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
