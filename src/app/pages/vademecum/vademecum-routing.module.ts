import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';

/** Rutas del módulo Vademécum (BO-01). El permiso se valida en pages-routing con VademecumGuard. */
const routes: Routes = [
  { path: '', redirectTo: 'uploads', pathMatch: 'full' },
  { path: 'uploads', component: UploadListComponent },
  { path: 'uploads/:id', component: UploadDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VademecumRoutingModule {}
