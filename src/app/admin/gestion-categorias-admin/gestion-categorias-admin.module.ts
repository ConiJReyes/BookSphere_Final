import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionCategoriasAdminPageRoutingModule } from './gestion-categorias-admin-routing.module';

import { GestionCategoriasAdminPage } from './gestion-categorias-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionCategoriasAdminPageRoutingModule
  ],
  declarations: [GestionCategoriasAdminPage]
})
export class GestionCategoriasAdminPageModule {}
