import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPerfilUsuarioPageRoutingModule } from './modificar-perfil-usuario-routing.module';

import { ModificarPerfilUsuarioPage } from './modificar-perfil-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPerfilUsuarioPageRoutingModule
  ],
  declarations: [ModificarPerfilUsuarioPage]
})
export class ModificarPerfilUsuarioPageModule {}
