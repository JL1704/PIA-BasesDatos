import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosCreadosPage } from './eventos-creados.page';

const routes: Routes = [
  {
    path: '',
    component: EventosCreadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosCreadosPageRoutingModule {}
