import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosEstrenosPage } from './libros-estrenos.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosEstrenosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosEstrenosPageRoutingModule {}
