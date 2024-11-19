import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarcodigoPageRoutingModule } from './enviarcodigo-routing.module';

import { EnviarcodigoPage } from './enviarcodigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarcodigoPageRoutingModule
  ],
  declarations: [EnviarcodigoPage]
})
export class EnviarcodigoPageModule {}
