import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription(); // Inicialización
  isSignUpModalOpen: boolean = false;

  constructor(private authService: AuthService, private modalController: ModalController) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async openSignUpModal(event: Event) {
    event.preventDefault();
    // Verifica si el modal ya está abierto antes de intentar abrir otro
    if (!this.isSignUpModalOpen) {
      this.isSignUpModalOpen = true;
      const modal = await this.modalController.create({
        component: SignUpComponent,
      });
      modal.onDidDismiss().then(() => {
        this.isSignUpModalOpen = false;
      });
      await modal.present();
    }
  }

  closeSignUpModal() {
    // Asegúrate de que la variable isSignUpModalOpen se establezca en falso al cerrar el modal
    this.isSignUpModalOpen = false;
    this.modalController.dismiss();
  }
}



