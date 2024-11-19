import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadacategoriaPageRoutingModule } from './cadacategoria-routing.module';

import { CadacategoriaPage } from './cadacategoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadacategoriaPageRoutingModule
  ],
  declarations: [CadacategoriaPage]
})
export class CadacategoriaPageModule {}
