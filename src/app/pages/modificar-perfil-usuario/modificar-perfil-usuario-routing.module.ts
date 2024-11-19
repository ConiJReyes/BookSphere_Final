import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPerfilUsuarioPage } from './modificar-perfil-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPerfilUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPerfilUsuarioPageRoutingModule {}
