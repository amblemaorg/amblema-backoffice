import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmblemaConfirmationRequestComponent } from './amblema-confirmation-request.component';

const routes: Routes = [
  { path: '', component: AmblemaConfirmationRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmblemaConfirmationRequestRoutingModule { }
