import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorStatusComponent } from './sponsor-status.component';


const routes: Routes = [{ path: '', component: SponsorStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorStatusRoutingModule { }
