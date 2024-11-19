import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerLibrosAdminPage } from './ver-libros-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VerLibrosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerLibrosAdminPageRoutingModule {}
