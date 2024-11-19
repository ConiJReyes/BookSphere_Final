import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionUsuarioAdminPageRoutingModule } from './gestion-usuario-admin-routing.module';

import { GestionUsuarioAdminPage } from './gestion-usuario-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionUsuarioAdminPageRoutingModule
  ],
  declarations: [GestionUsuarioAdminPage]
})
export class GestionUsuarioAdminPageModule {}
