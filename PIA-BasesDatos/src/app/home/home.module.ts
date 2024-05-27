import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { EventosComponent } from '../eventos/eventos.component';
import { DetallesComponent } from '../detalles/detalles.component';

import { EditarEventoComponent } from '../editar-evento/editar-evento.component';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, EventosComponent, DetallesComponent, EditarEventoComponent]
})
export class HomePageModule {}
