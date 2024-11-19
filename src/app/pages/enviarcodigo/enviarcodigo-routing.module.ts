import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarcodigoPage } from './enviarcodigo.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarcodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarcodigoPageRoutingModule {}
