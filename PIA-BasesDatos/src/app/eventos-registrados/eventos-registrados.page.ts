import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddInvitadoComponent } from '../add-invitado/add-invitado.component';
import { VerUsuariosComponent } from '../ver-usuarios/ver-usuarios.component';
import { VerInvitadosComponent } from '../ver-invitados/ver-invitados.component';


@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.page.html',
  styleUrls: ['./eventos-registrados.page.scss'],
})
export class EventosRegistradosPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async abrirModalAddInvitado() {
    const modal = await this.modalController.create({
      component: AddInvitadoComponent,
      // Puedes añadir más configuraciones aquí, como props
    });
    return await modal.present();
  }

  async abrirModalVerUsuarios() {
    const modal = await this.modalController.create({
      component: VerUsuariosComponent,
      // Puedes añadir más configuraciones aquí, como props
    });
    return await modal.present();
  }

  async abrirModalVerInvitados() {
    const modal = await this.modalController.create({
      component: VerInvitadosComponent, // Componente VerInvitados que quieres mostrar en el modal
      componentProps: {
        // Puedes pasar cualquier dato necesario al componente VerInvitados aquí
      }
    });
    return await modal.present();
  }

}


  


  
