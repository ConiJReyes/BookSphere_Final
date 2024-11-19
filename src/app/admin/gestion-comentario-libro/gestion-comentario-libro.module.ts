import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionComentarioLibroPageRoutingModule } from './gestion-comentario-libro-routing.module';

import { GestionComentarioLibroPage } from './gestion-comentario-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionComentarioLibroPageRoutingModule
  ],
  declarations: [GestionComentarioLibroPage]
})
export class GestionComentarioLibroPageModule {}
