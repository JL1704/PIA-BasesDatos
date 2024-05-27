import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEventosPageRoutingModule } from './crear-eventos-routing.module';

import { CrearEventosPage } from './crear-eventos.page';
import { FormularioComponent } from '../formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDependenciaComponent } from '../form-dependencia/form-dependencia.component';
import { FormSedeComponent } from '../form-sede/form-sede.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearEventosPageRoutingModule
  ],
  declarations: [CrearEventosPage, FormularioComponent, FormDependenciaComponent, FormSedeComponent]
})
export class CrearEventosPageModule {}
