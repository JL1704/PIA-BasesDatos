import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.scss']
})
export class VerUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private toastController: ToastController

  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  /*obtenerUsuarios() {
    this.firestore.collection('usuarios').valueChanges().subscribe(data => {
      this.usuarios = data;
    });
  }*/

  obtenerUsuarios() {
    this.firestore.collection('usuarios').snapshotChanges().subscribe(data => {
      this.usuarios = data.map(e => {
        const usuarioData = e.payload.doc.data() as any;
        const id = e.payload.doc.id;
        return Object.assign({}, { id, ...usuarioData });
      });
    });
  }
  
  
  

  async eliminarUsuario(usuarioId: string) {
    try {
      await this.firestore.doc(`usuarios/${usuarioId}`).delete();
      // Muestra un mensaje de confirmación solo si la eliminación se realiza correctamente
      this.mostrarMensaje('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      this.mostrarMensaje('Error al eliminar usuario', 'danger');
    }
  }
  

  async mostrarMensaje(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

