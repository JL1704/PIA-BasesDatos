import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SesionService } from '../sesion.service';
import { Cuenta } from 'src/app/interfaces/cuenta.interface';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  cuenta: Cuenta = {
    id_Cuenta: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    fk_Id_Rol: 0
  };
  roles = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Usuario' },
    { id: 3, nombre: 'Invitado' }
  ];

  constructor(private modalController: ModalController, private sesionService: SesionService) {}

  ngOnInit() {}

  crearCuenta() {
    this.sesionService.crearCuenta(this.cuenta).subscribe(
      response => {
        console.log('Cuenta creada con éxito', response);
        // Maneja la respuesta de éxito aquí
        this.closeModal();
      },
      error => {
        console.error('Error al crear cuenta', error);
        // Maneja el error aquí
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}


