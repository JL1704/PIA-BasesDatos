import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEventosPage } from './crear-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEventosPageRoutingModule {}
