/*import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegistrosService } from '../registros.service';
import { ModalController } from '@ionic/angular';
import { BoletoComponent } from '../boleto/boleto.component'; 


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
    private registrosService: RegistrosService,
    private modalController: ModalController
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

  async abrirModal() {
    const modal = await this.modalController.create({
      component: BoletoComponent, // Aquí debes poner el nombre de tu modal
      componentProps: {
        // Puedes pasar propiedades al modal si lo necesitas
      }
    });
    return await modal.present();
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
  }

}*/
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegistrosService } from '../registros.service';
import { ModalController } from '@ionic/angular';
import { BoletoComponent } from '../boleto/boleto.component';

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
    private registrosService: RegistrosService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.obtenerOpcionesEventos();
  }

  obtenerOpcionesEventos() {
    this.registrosService.obtenerOpcionesEventos().subscribe(eventos => {
      this.eventos = eventos;
    });
  }

  async enviarRegistroYAbrirModal() {
    // Formatear la referencia al evento seleccionado
    const eventoRef = `eventos/${this.registro.evento}`;
    this.registro.evento = this.firestore.doc(eventoRef).ref;

    try {
      await this.registrosService.agregarRegistro(this.registro);
      console.log('Registro agregado correctamente.');
      await this.abrirModal();
    } catch (error) {
      console.error('Error al agregar el registro: ', error);
    }
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: BoletoComponent,
      componentProps: {
        registro: this.registro // Pasar los datos del registro al componente de boleto
      }
    });
    return await modal.present();
  }
}
