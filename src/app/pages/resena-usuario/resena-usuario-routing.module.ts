import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResenaUsuarioPage } from './resena-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ResenaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResenaUsuarioPageRoutingModule {}
