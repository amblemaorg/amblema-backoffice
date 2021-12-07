import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpecialtyComponent } from "./specialty.component";

const routes: Routes = [{ path: "", component: SpecialtyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialtyRoutingModule {}
