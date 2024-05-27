/*import { Component, OnInit } from '@angular/core';
import { Evento } from '../interfaces/evento.interface';
import { CreaEventoService } from '../crea-evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent  implements OnInit {

  eventos: Evento[] = [];

  constructor(private creaEventoService: CreaEventoService) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.creaEventoService.obtenerEventos().subscribe(
      eventos => {
        this.eventos = eventos;
      },
      error => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  obtenerDia(fecha: Date): string {
    return fecha.getDate().toString().padStart(2, '0');
  }

  obtenerMes(fecha: Date): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[fecha.getMonth()];
  }

  obtenerNombreSede(idSede: number): string {
    // Aquí debes llamar a un servicio para obtener el nombre de la sede según su ID
    // Por simplicidad, asumiré que tienes un servicio llamado 'SedeService'
    // que tiene un método 'obtenerNombreSedePorId' para obtener el nombre de la sede por su ID
    // Debes ajustar esto según tu implementación real
    return 'Nombre de la sede'; // Reemplaza esto con la llamada real al servicio
  }

}*/

import { Component, OnInit } from '@angular/core';
import { Evento } from '../interfaces/evento.interface';
import { EventoService } from '../evento.service';
import { SedeService } from '../sede.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(private eventoService: EventoService, private sedeService: SedeService) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerDia(fecha: Date): string {
    return new Date(fecha).getDate().toString().padStart(2, '0');
  }

  obtenerMes(fecha: Date): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[new Date(fecha).getMonth()];
  }

  obtenerEventos() {
    this.eventoService.obtenerEventos().subscribe(
      eventos => {
        this.eventos = eventos;
        console.log('Eventos obtenidos:', eventos);
      },
      error => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  obtenerNombreSede(idSede: string): Observable<string> {
    return this.sedeService.obtenerNombreSedePorId(idSede);
  }
}








