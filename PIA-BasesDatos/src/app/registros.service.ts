import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private firestore: AngularFirestore) { }

  agregarRegistro(registro: any) {
    // Generar un ID único para el documento utilizando el método `doc()` sin parámetros
    const id = this.firestore.createId();
    // Agregar el registro a la colección "Registros" utilizando el ID generado
    return this.firestore.collection('Registros').doc(id).set(registro);
  }

  obtenerOpcionesEventos() {
    return this.firestore.collection('eventos').valueChanges({ idField: 'id' });
  }
}
