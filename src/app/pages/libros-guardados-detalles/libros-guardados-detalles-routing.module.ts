import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosGuardadosDetallesPage } from './libros-guardados-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosGuardadosDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosGuardadosDetallesPageRoutingModule {}
