import { Component, OnInit } from '@angular/core';
import { SesionService } from '../sesion.service';
import { Cuenta } from 'src/app/interfaces/cuenta.interface'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {
  
  cuenta: Partial<Cuenta> = {
    correo: '',
    contrasena: ''
  };

  constructor(private sesionService: SesionService, private router: Router,
    private alertController: AlertController) {}

  ngOnInit() {}

  async iniciarSesion() {
    this.sesionService.iniciarSesion(this.cuenta as Cuenta).subscribe(
      async response => {
        if (response.success) {
          console.log('Sesión iniciada con éxito', response);
          // Redirigir a la página de inicio
          await this.router.navigate(['/tabs/home']);
        } else {
          console.error('Error al iniciar sesión', response.message);
          // Mostrar alerta en caso de error
          this.presentAlert('Error', response.message);
        }
      },
      async error => {
        console.error('Error al iniciar sesión', error);
        // Manejar cualquier otro error aquí
        this.presentAlert('Error', 'Ocurrió un error al iniciar sesión.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
