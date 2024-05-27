// src/app/detalles/detalles.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from '../interfaces/evento.interface';
import { Timestamp } from 'firebase/firestore'; // Cambia la importación de Timestamp
import { Sedes } from '../interfaces/sedes.interface';
import { Dependencias } from '../interfaces/dependencia.interface';

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


  constructor(private modalController: ModalController) { }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

