import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionCategoriasAdminPage } from './gestion-categorias-admin.page';

const routes: Routes = [
  {
    path: '',
    component: GestionCategoriasAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionCategoriasAdminPageRoutingModule {}
