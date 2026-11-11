import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetLoaderComponent } from './loader/sheet-loader.component';

/** Rutas del módulo Vademécum (BO-01). El permiso se valida en pages-routing con VademecumGuard. */
const routes: Routes = [
  { path: '', redirectTo: 'load', pathMatch: 'full' },
  { path: 'load', component: SheetLoaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VademecumRoutingModule {}
