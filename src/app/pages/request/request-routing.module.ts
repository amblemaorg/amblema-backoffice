import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'creation-requests',
    loadChildren: () => import('./creation-requests/creation-requests.module').
    then(m => m.CreationRequestsModule),
    data: {}
  },
  {
    path: 'project-requests',
    loadChildren: () => import('./project-requests/project-requests.module').
    then(m => m.ProjectRequestsModule),
    data: {}
  },
  {
    path: 'requests-validate-information',
    loadChildren: () => import('./requests-validate-information/requests-validate-information.module').
    then(m => m.RequestsValidateInformationModule),
    data: {}
  },
  {
    path: 'amblema-confirmation-request',
    loadChildren: () => import('./amblema-confirmation-request/amblema-confirmation-request.module').
    then(m => m.AmblemaConfirmationRequestModule),
    data: {}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
