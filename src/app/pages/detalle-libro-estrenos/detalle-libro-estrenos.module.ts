import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleLibroEstrenosPageRoutingModule } from './detalle-libro-estrenos-routing.module';

import { DetalleLibroEstrenosPage } from './detalle-libro-estrenos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleLibroEstrenosPageRoutingModule
  ],
  declarations: [DetalleLibroEstrenosPage]
})
export class DetalleLibroEstrenosPageModule {}
