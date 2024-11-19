import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosGuardadosDetallesPageRoutingModule } from './libros-guardados-detalles-routing.module';

import { LibrosGuardadosDetallesPage } from './libros-guardados-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrosGuardadosDetallesPageRoutingModule
  ],
  declarations: [LibrosGuardadosDetallesPage]
})
export class LibrosGuardadosDetallesPageModule {}
