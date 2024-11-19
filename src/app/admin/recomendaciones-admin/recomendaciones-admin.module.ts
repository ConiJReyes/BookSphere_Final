import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendacionesAdminPageRoutingModule } from './recomendaciones-admin-routing.module';

import { RecomendacionesAdminPage } from './recomendaciones-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendacionesAdminPageRoutingModule
  ],
  declarations: [RecomendacionesAdminPage]
})
export class RecomendacionesAdminPageModule {}
