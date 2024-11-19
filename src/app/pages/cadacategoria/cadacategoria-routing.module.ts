import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadacategoriaPage } from './cadacategoria.page';

const routes: Routes = [
  {
    path: '',
    component: CadacategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadacategoriaPageRoutingModule {}
