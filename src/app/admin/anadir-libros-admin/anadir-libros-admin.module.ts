import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirLibrosAdminPageRoutingModule } from './anadir-libros-admin-routing.module';

import { AnadirLibrosAdminPage } from './anadir-libros-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirLibrosAdminPageRoutingModule
  ],
  declarations: [AnadirLibrosAdminPage]
})
export class AnadirLibrosAdminPageModule {}
