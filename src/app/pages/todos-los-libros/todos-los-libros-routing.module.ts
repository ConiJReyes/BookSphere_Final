import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosLosLibrosPage } from './todos-los-libros.page';

const routes: Routes = [
  {
    path: '',
    component: TodosLosLibrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosLosLibrosPageRoutingModule {}
