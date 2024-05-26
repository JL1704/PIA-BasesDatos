import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Evento } from './interfaces/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class CreaEventoService {

  private eventos: Evento[] = [];

  constructor() {}

  crearEvento(evento: Evento): Observable<any> {
    // Agregamos el nuevo evento al arreglo de eventos
    this.eventos.push(evento);
    
    // Simulamos una respuesta del servidor con un retraso de 1 segundo
    return of({ success: true, message: 'Evento creado con éxito', data: evento }).pipe(
      delay(1000) // Simula el tiempo de respuesta del servidor
    );
  }

  obtenerEventos(): Observable<Evento[]> {
    // Devolvemos una copia del arreglo de eventos
    return of([...this.eventos]).pipe(
      delay(500) // Simula el tiempo de respuesta del servidor
    );
  }
}