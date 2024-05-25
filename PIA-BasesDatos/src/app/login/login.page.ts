import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar el Router
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from '../usuario/sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSignUpModalOpen: boolean = false;

  constructor(private router: Router, private modalController: ModalController) { }  // Inyectar el Router

  ngOnInit() {
  }

  async openSignUpModal(event: Event) {
    this.isSignUpModalOpen = false;
    event.preventDefault();
    // Verifica si el modal ya está abierto antes de intentar abrir otro
    if (!this.isSignUpModalOpen) {
      this.isSignUpModalOpen = true;
      const modal = await this.modalController.create({
        component: SignUpComponent,
      });
      await modal.present();
    }
  }

  navigateToTabs() {
    this.router.navigate(['/tabs']);  // Navegar a la página de tabs
  }
}

