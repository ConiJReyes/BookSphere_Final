import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerLibrosAdminPageRoutingModule } from './ver-libros-admin-routing.module';

import { VerLibrosAdminPage } from './ver-libros-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerLibrosAdminPageRoutingModule
  ],
  declarations: [VerLibrosAdminPage]
})
export class VerLibrosAdminPageModule {}
