import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Evento } from './interfaces/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private eventosCollection = this.firestore.collection<Evento>('eventos');

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  subirImagen(file: File, nombreEvento: string): Observable<string> {
    const filePath = `posters/${nombreEvento}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
    return task.snapshotChanges().pipe(
      finalize(() => from(fileRef.getDownloadURL())),
      switchMap(url => from(fileRef.getDownloadURL()))
    );
  }

  crearEvento(evento: any, nombreEvento: string): Observable<void> {
    const eventoRef = this.firestore.collection('eventos').doc(nombreEvento);
    return from(eventoRef.set(evento));
  }

  getEventos(): Observable<Evento[]> {
    return this.eventosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Evento;
        return { ...data, idEvento: a.payload.doc.id }; // Elimina cualquier duplicación de `idEvento`
      }))
    );
  }



}










  





