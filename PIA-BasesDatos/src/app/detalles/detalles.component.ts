// src/app/detalles/detalles.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from '../interfaces/evento.interface';
import { Timestamp } from 'firebase/firestore'; // Cambia la importación de Timestamp

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
    dependencias: '',
    poster: '',
    temario: '',
    costos: 0,
    capacidad: 0,
    disponibilidad: '',
    fkIdInvitados: '',
    fechaEvento: Timestamp.now(), // Utiliza Timestamp.now() para obtener la fecha actual
    fechaCreacion: Timestamp.now() // Utiliza Timestamp.now() para obtener la fecha actual
  };

  constructor(private modalController: ModalController) { }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

