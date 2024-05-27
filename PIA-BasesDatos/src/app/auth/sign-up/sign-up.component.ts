
/*import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('email') emailInput!: IonInput;
  @ViewChild('password') passwordInput!: IonInput;
  @ViewChild('nombreInput') nombreInput!: IonInput; // Agrega ViewChild para el campo de nombre
  selectedRole: string = ''; // Variable para almacenar el rol seleccionado

  constructor(private authService: AuthService, private modalController: ModalController) {}

  signUp(event: Event) {
    event.preventDefault();
    const email = this.emailInput.value as string;
    const password = this.passwordInput.value as string;
    const nombre = this.nombreInput.value as string; // Obtén el valor del campo de nombre

    if (email && password && nombre && this.selectedRole) {
      // Si todos los campos están completos, enviar la información al servicio de autenticación
      this.authService.signUpWithEmailAndPassword(email, password)
        .then(() => {
        })
        .catch((error) => {
          // Manejar errores si ocurren
          console.error('Error al registrar usuario:', error);
        });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}*/

import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('email') emailInput!: IonInput;
  @ViewChild('password') passwordInput!: IonInput;
  @ViewChild('nombreInput') nombreInput!: IonInput;
  selectedRole: string = '';

  constructor(private authService: AuthService, private modalController: ModalController) {}

  signUp(event: Event) {
    event.preventDefault();
    const email = this.emailInput.value as string;
    const password = this.passwordInput.value as string;
    const nombre = this.nombreInput.value as string;

    if (email && password && nombre && this.selectedRole) {
      // Si todos los campos están completos, enviar la información al servicio de autenticación
      this.authService.signUpWithEmailAndPassword(email, password, nombre, this.selectedRole)
        .then(() => {
          console.log('Usuario registrado exitosamente');
          // Cerrar el modal o realizar otras acciones necesarias después del registro exitoso
          this.closeModal();
        })
        .catch((error) => {
          // Manejar errores si ocurren
          console.error('Error al registrar usuario:', error);
          // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

