import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendacionesAdminPage } from './recomendaciones-admin.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendacionesAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendacionesAdminPageRoutingModule {}
