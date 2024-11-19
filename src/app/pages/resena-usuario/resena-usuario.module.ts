import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResenaUsuarioPageRoutingModule } from './resena-usuario-routing.module';

import { ResenaUsuarioPage } from './resena-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResenaUsuarioPageRoutingModule
  ],
  declarations: [ResenaUsuarioPage]
})
export class ResenaUsuarioPageModule {}
