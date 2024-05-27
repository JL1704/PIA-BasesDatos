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

 /* obtenerEventos(): Observable<Evento[]> {
    return this.firestore.collection<Evento>('eventos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Evento;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }*/
/*
  obtenerEventos(): Observable<Evento[]> {
    return this.firestore.collection<Evento>('eventos').get().pipe(
      map(snapshot => {
        const eventos: Evento[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as Evento;
          const id = doc.id;
          eventos.push({ ...data });
        });
        return eventos;
      })
    );
  }*/

  obtenerEventos(): Observable<Evento[]> {
    return this.firestore.collection<Evento>('eventos').valueChanges({ idField: 'id' });
  }

}








  





