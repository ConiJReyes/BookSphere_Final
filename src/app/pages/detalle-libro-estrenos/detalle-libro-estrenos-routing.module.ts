import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleLibroEstrenosPage } from './detalle-libro-estrenos.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleLibroEstrenosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleLibroEstrenosPageRoutingModule {}
