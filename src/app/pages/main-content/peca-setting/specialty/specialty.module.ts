import { SpecialtyRoutingModule } from "./specialty-routing.module";
import { SpecialtyComponent } from "./specialty.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule, NbRadioModule, NbAlertModule } from "@nebular/theme";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [SpecialtyComponent],
  imports: [
    CommonModule,
    NbRadioModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    SpecialtyRoutingModule,
  ],
})
export class SpecialtyModule {}
