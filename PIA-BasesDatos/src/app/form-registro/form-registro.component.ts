import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnInit {

  registro: any = {
    nombre: '',
    correo: '',
    asiento: '',
    evento: '',
    metodoPago: ''
  };

  eventos: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private registrosService: RegistrosService
  ) { }

  ngOnInit(): void {
    this.obtenerOpcionesEventos();
  }

  obtenerOpcionesEventos() {
    this.registrosService.obtenerOpcionesEventos().subscribe(eventos => {
      this.eventos = eventos;
    });
  }

  enviarRegistro() {
    // Formatear la referencia al evento seleccionado
    const eventoRef = `eventos/${this.registro.evento}`;
    this.registro.evento = this.firestore.doc(eventoRef).ref;

    this.registrosService.agregarRegistro(this.registro)
      .then(() => {
        console.log('Registro agregado correctamente.');
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción después de agregar el registro.
      })
      .catch(error => {
        console.error('Error al agregar el registro: ', error);
      });
  }

  /*enviarRegistro() {
    this.registrosService.agregarRegistro(this.registro)
      .then(() => {
        console.log('Registro agregado correctamente.');
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción después de agregar el registro.
      })
      .catch(error => {
        console.error('Error al agregar el registro: ', error);
      });
  }*/

}
