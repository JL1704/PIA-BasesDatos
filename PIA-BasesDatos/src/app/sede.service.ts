import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private firestore: AngularFirestore) { }

  getSedes(): Observable<any[]> {
    return this.firestore.collection('Sedes').valueChanges({ idField: 'id' });
  }

  getDependencias(): Observable<any[]> {
    return this.firestore.collection('Dependencias').valueChanges({ idField: 'id' });
  }

  obtenerNombreSedePorId(idSede: string): Observable<string> {
    return this.firestore.doc<{ nombre: string }>(`Sedes/${idSede}`).valueChanges().pipe(
      map(data => data ? data.nombre : 'Nombre de la sede no encontrado')
    );
  }
}






