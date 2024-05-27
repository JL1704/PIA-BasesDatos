import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logIn(email: string, password: string) {
    // Verifica que los campos de correo electrónico y contraseña no estén vacíos
    if (!email || !password) {
      this.loginError = "Please fill in all fields.";
      return;
    }

    this.authService.logInWithEmailAndPassword(email, password)
      .then(() => {
        // Redireccionar al usuario a la página de inicio
        this.router.navigate(['/tabs/profile']);
      })
      .catch(error => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        this.loginError = error.message; // Puedes manejar el error como desees, por ejemplo, mostrarlo en la interfaz de usuario
        console.error('Error during login:', error);
      });
  }
}
