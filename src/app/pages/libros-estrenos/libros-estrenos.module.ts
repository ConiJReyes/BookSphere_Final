import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosEstrenosPageRoutingModule } from './libros-estrenos-routing.module';

import { LibrosEstrenosPage } from './libros-estrenos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrosEstrenosPageRoutingModule
  ],
  declarations: [LibrosEstrenosPage]
})
export class LibrosEstrenosPageModule {}
