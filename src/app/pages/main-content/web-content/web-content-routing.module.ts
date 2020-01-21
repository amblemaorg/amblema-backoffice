import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebContentComponent } from './web-content.component';

const routes: Routes = [
  { path: '', component: WebContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebContentRoutingModule { }
