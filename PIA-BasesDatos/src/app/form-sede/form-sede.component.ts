import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SedeService } from '../sede.service';



@Component({
  selector: 'app-form-sede',
  templateUrl: './form-sede.component.html',
  styleUrls: ['./form-sede.component.scss'],
})
export class FormSedeComponent  implements OnInit {

  constructor(private modalController: ModalController, private sedesService: SedeService) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

  nuevaSede: any = {
    Nombre: '',
    TipoSede: '',
    Calle: '',
    Colonia: '',
    Municipio: '',
    Estado: '',
    CodigoPostal: ''
  };

  agregarSede() {
    this.sedesService.agregarSede(this.nuevaSede)
      .then(() => {
        console.log('Sede agregada correctamente.');
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción después de agregar la sede.
      })
      .catch(error => {
        console.error('Error al agregar la sede: ', error);
      });
  }
}

