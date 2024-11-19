import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleslibroPageRoutingModule } from './detalleslibro-routing.module';

import { DetalleslibroPage } from './detalleslibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleslibroPageRoutingModule
  ],
  declarations: [DetalleslibroPage]
})
export class DetalleslibroPageModule {}
