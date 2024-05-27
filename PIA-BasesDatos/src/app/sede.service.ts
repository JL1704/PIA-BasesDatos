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
    return this.firestore.doc<{ Nombre: string }>(`Sedes/${idSede}`).valueChanges().pipe(
      map(data => data ? data.Nombre : 'Nombre de la sede no encontrado')
    );
  }

  agregarSede(sede: any) {
    return this.firestore.collection('Sedes').doc(sede.Nombre).set(sede);
  }

  agregarDependencia(dependencia: any) {
    return this.firestore.collection('Dependencias').doc(dependencia.Nombre).set(dependencia);
  }
}






