import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PecaSettingComponent } from "./peca-setting.component";

const routes: Routes = [
  {
    path: "",
    component: PecaSettingComponent,
    children: [
      {
        path: "workshop",
        loadChildren: () =>
          import("./workshop/workshop.module").then((m) => m.WorkshopModule),
      },
      {
        path: "lapse",
        loadChildren: () =>
          import("./lapse/lapse.module").then((m) => m.LapseModule),
      },
      {
        path: "goals",
        loadChildren: () =>
          import("./goals/goals.module").then((m) => m.GoalsModule),
      },
      {
        path: "specialty",
        loadChildren: () =>
          import("./specialty/specialty.module").then((m) => m.SpecialtyModule),
      },

      {
        path: "coins",
        loadChildren: () =>
          import("./coins/coins.module").then((m) => m.CoinsModule),
      },
      {
        path: "convention",
        loadChildren: () =>
          import("./convention/convention.module").then(
            (m) => m.ConventionModule
          ),
      },
      {
        path: "activity-strategies",
        loadChildren: () =>
          import("./activity-strategies/activity-strategies.module").then(
            (m) => m.ActivityStrategiesModule
          ),
      },
      {
        path: "admin-year",
        loadChildren: () =>
          import("./admin-year-lapses/admin-year/admin-year.module").then(
            (m) => m.AdminYearModule
          ),
      },
      {
        path: "admin-lapses",
        loadChildren: () =>
          import("./admin-year-lapses/admin-lapses/admin-lapses.module").then(
            (m) => m.AdminLapsesModule
          ),
      },
      {
        path: "environmental-project",
        loadChildren: () =>
          import("./environmental-project/environmental-project.module").then(
            (m) => m.EnvironmentalProjectModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PecaSettingRoutingModule {}
