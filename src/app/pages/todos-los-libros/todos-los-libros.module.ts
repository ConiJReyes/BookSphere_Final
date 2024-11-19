import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodosLosLibrosPageRoutingModule } from './todos-los-libros-routing.module';

import { TodosLosLibrosPage } from './todos-los-libros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosLosLibrosPageRoutingModule
  ],
  declarations: [TodosLosLibrosPage]
})
export class TodosLosLibrosPageModule {}
