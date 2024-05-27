/*import { Component, OnInit } from '@angular/core';
import { Evento } from '../interfaces/evento.interface';
import { EventoService } from '../evento.service';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private firestore: AngularFirestore // Inyecta AngularFirestore
  ) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
      // Obtén los datos de la sede para cada evento
      this.eventos.forEach(evento => {
        evento.fechaEvento = this.formatDate(evento.fechaEvento);
        this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
          evento.fkIdSede = sede.nombre; // Asigna el nombre de la sede al evento
        });
      });
    });
  }

  formatDate(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000); // Convierte los segundos a milisegundos
    return formatDate(date, 'dd/MM/yyyy HH:mm:ss', 'en-US'); // Formato de fecha deseado
  }

}*/

// src/app/eventos/eventos.component.ts
// src/app/eventos/eventos.component.ts
import { Component, OnInit } from '@angular/core';
import { Evento } from '../interfaces/evento.interface';
import { EventoService } from '../evento.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  diasEventos: string[] = [];
  mesesEventos: string[] = [];

  constructor(
    private eventoService: EventoService,
    private firestore: AngularFirestore,
    private modalController: ModalController // Inyecta AngularFirestore
  ) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
      this.eventos.forEach(evento => {
        this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
          evento.fkIdSede = sede.nombre; // Asigna el nombre de la sede al evento
        });
        // Obtener día y mes del evento
        const date = new Date(evento.fechaEvento.seconds * 1000); // Asegúrate de que fechaEvento sea un objeto Timestamp
        const day = date.getDate().toString().padStart(2, '0'); // Obtener día con dos dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes con dos dígitos
        this.diasEventos.push(day);
        this.mesesEventos.push(month);
      });
    });
  }

  async abrirModal(evento: Evento) {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        evento: evento // Pasa el evento seleccionado al componente Detalles
      }
    });
    return await modal.present();
  }
}
