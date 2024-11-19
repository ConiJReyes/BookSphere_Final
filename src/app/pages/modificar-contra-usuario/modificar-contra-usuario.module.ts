import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarContraUsuarioPageRoutingModule } from './modificar-contra-usuario-routing.module';

import { ModificarContraUsuarioPage } from './modificar-contra-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarContraUsuarioPageRoutingModule
  ],
  declarations: [ModificarContraUsuarioPage]
})
export class ModificarContraUsuarioPageModule {}
