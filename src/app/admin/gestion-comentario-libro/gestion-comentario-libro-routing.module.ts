import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionComentarioLibroPage } from './gestion-comentario-libro.page';

const routes: Routes = [
  {
    path: '',
    component: GestionComentarioLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionComentarioLibroPageRoutingModule {}
