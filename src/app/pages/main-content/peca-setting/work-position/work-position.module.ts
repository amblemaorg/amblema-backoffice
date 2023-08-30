import { WorkPositionRoutingModule } from "./work-position-routing.module";
import { WorkPositionComponent } from "./work-position.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule, NbRadioModule, NbAlertModule } from "@nebular/theme";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [WorkPositionComponent],
  imports: [
    CommonModule,
    NbRadioModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    WorkPositionRoutingModule,
  ],
})
export class WorkPositionModule {}
