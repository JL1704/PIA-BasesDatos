import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';
import { FormRegistroComponent } from '../form-registro/form-registro.component';
import { RegistrarPage } from './registrar.page';
import { BoletoComponent } from '../boleto/boleto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPageRoutingModule
  ],
  declarations: [RegistrarPage, FormRegistroComponent, BoletoComponent]
})
export class RegistrarPageModule {}
