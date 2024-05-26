import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEventosPageRoutingModule } from './crear-eventos-routing.module';

import { CrearEventosPage } from './crear-eventos.page';
import { FormularioComponent } from '../formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearEventosPageRoutingModule
  ],
  declarations: [CrearEventosPage, FormularioComponent]
})
export class CrearEventosPageModule {}
