import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationRequestsComponent } from './creation-requests.component';


const routes: Routes = [
  { path: '', component: CreationRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreationRequestsRoutingModule { }
