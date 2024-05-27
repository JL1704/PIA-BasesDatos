import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-dependencia',
  templateUrl: './form-dependencia.component.html',
  styleUrls: ['./form-dependencia.component.scss'],
})
export class FormDependenciaComponent  implements OnInit {

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}


