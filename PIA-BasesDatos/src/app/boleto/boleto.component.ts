import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss'],
})
export class BoletoComponent  implements OnInit {

  @Input() registro: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

}



 


