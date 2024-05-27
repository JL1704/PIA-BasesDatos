import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-invitado',
  templateUrl: './add-invitado.component.html',
  styleUrls: ['./add-invitado.component.scss'],
})
export class AddInvitadoComponent implements OnInit {

  nombre: string = '';
  correo: string = '';
  idEvento: string = '';
  eventos: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    // Cargar los eventos desde Firestore
    this.firestore.collection('eventos').valueChanges().subscribe(data => {
      this.eventos = data;
    });
  }

  async guardarInvitado() {
    const invitado = {
      nombre: this.nombre,
      correo: this.correo,
      idEvento: this.idEvento
    };

    try {
      await this.firestore.collection('invitados').add(invitado);
      console.log('Invitado guardado exitosamente');
      // Puedes agregar código adicional aquí, como cerrar el modal
    } catch (error) {
      console.error('Error al guardar el invitado:', error);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

