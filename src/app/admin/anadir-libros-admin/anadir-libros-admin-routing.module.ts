import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirLibrosAdminPage } from './anadir-libros-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirLibrosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirLibrosAdminPageRoutingModule {}
