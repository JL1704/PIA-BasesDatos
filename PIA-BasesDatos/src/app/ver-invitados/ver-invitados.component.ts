import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-invitados',
  templateUrl: './ver-invitados.component.html',
  styleUrls: ['./ver-invitados.component.scss'],
})
export class VerInvitadosComponent {
  invitados: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) { }

  ionViewWillEnter() {
    this.obtenerInvitados();
  }

  obtenerInvitados() {
    this.firestore.collection('invitados').snapshotChanges().subscribe(data => {
      this.invitados = data.map(e => {
        const invitado: any = e.payload.doc.data(); // Definimos invitado como any
        const id = e.payload.doc.id;
        return { id, ...invitado };
      });
    });
  }

  async eliminarInvitado(invitadoId: string) {
    try {
      await this.firestore.doc(`invitados/${invitadoId}`).delete();
      // Actualizamos la lista de invitados después de eliminar uno
      this.obtenerInvitados();
    } catch (error) {
      console.error('Error al eliminar invitado:', error);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
