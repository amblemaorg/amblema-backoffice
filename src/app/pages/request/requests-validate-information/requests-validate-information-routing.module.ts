import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsValidateInformationComponent } from './requests-validate-information.component';


const routes: Routes = [
  { path: '', component: RequestsValidateInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsValidateInformationRoutingModule { }
