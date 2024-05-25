import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosCreadosPageRoutingModule } from './eventos-creados-routing.module';

import { EventosCreadosPage } from './eventos-creados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosCreadosPageRoutingModule
  ],
  declarations: [EventosCreadosPage]
})
export class EventosCreadosPageModule {}
