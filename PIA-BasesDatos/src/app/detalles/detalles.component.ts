// src/app/detalles/detalles.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from '../interfaces/evento.interface';
import { Timestamp } from 'firebase/firestore'; // Cambia la importación de Timestamp
import { Sedes } from '../interfaces/sedes.interface';
import { Dependencias } from '../interfaces/dependencia.interface';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent {
  @Input() evento: Evento = {
    idEvento: '',
    nombre: '',
    categoria: '',
    fkIdSede: '',
    fkIdDependencias: '',
    poster: '',
    temario: '',
    costos: 0,
    capacidad: 0,
    disponibilidad: '',
    fkIdInvitados: '',
    fechaEvento: Timestamp.now(), // Utiliza Timestamp.now() para obtener la fecha actual
    fechaCreacion: Timestamp.now() // Utiliza Timestamp.now() para obtener la fecha actual
  };

  @Input() sede: Sedes={
      IdSede: '',
      NombreSede: '',
      TipoSede: '',
      Calle: '',
      CodigoPostal: '',
      Colonia: '',
      Estado:'',
      Municipio: ''
  
  }

  @Input() dependencia: Dependencias={
    IdDependencia: '',
    NombreDependencia: '',
    TipoDependencia: '',
}

async abrirEdicionEvento() {
  const modal = await this.modalController.create({
    component: EditarEventoComponent,
    componentProps: {
      evento: this.evento // Pasar el evento al componente de edición
    }
  });
  return await modal.present();
}

async eliminarEvento() {
  try {
    await this.firestore.collection('eventos').doc(this.evento.idEvento).delete();
    // Cerrar el modal después de eliminar el evento
    this.modalController.dismiss();
  } catch (error) {
    console.error('Error al eliminar evento:', error);
  }
}


  constructor(private modalController: ModalController, private firestore: AngularFirestore) { }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

