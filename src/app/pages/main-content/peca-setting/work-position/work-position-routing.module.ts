import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkPositionComponent } from "./work-position.component";

const routes: Routes = [{ path: "", component: WorkPositionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPositionRoutingModule {}
