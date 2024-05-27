import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SedeService } from '../sede.service';

@Component({
  selector: 'app-form-dependencia',
  templateUrl: './form-dependencia.component.html',
  styleUrls: ['./form-dependencia.component.scss'],
})
export class FormDependenciaComponent  implements OnInit {

  nuevaDependencia: any = {
    Nombre: '',
    TipoDependencia: ''
  };

  constructor(private modalController: ModalController, private sedesService: SedeService) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

  agregarDependencia() {
    this.sedesService.agregarDependencia(this.nuevaDependencia)
      .then(() => {
        console.log('Dependencia agregada correctamente.');
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción después de agregar la sede.
      })
      .catch(error => {
        console.error('Error al agregar la sede: ', error);
      });
  }

}


