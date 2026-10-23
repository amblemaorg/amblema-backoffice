import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YearbookOrderComponent } from './yearbook-order.component';

const routes: Routes = [
  {
    path: '',
    component: YearbookOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearbookOrderRoutingModule { }
