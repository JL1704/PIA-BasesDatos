import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { InfoPerfilComponent } from '../info-perfil/info-perfil.component';



import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from '../auth/dashboard/dashboard.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage, InfoPerfilComponent, LoginComponent, DashboardComponent, SignUpComponent]
})
export class PerfilPageModule {}


