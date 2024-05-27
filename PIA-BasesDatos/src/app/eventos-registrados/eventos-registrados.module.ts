import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosRegistradosPageRoutingModule } from './eventos-registrados-routing.module';

import { EventosRegistradosPage } from './eventos-registrados.page';
import { AddInvitadoComponent } from '../add-invitado/add-invitado.component';
import { VerUsuariosComponent } from '../ver-usuarios/ver-usuarios.component';
import { VerInvitadosComponent } from '../ver-invitados/ver-invitados.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosRegistradosPageRoutingModule
  ],
  declarations: [EventosRegistradosPage, AddInvitadoComponent, VerUsuariosComponent, VerInvitadosComponent]
})
export class EventosRegistradosPageModule {}
