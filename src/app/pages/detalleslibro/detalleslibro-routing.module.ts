import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleslibroPage } from './detalleslibro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleslibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleslibroPageRoutingModule {}
