import { Component, OnInit } from '@angular/core';
import { Evento } from '../interfaces/evento.interface';
import { EventoService } from '../evento.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';
import { Sedes } from '../interfaces/sedes.interface';

import { Dependencias } from '../interfaces/dependencia.interface';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  diasEventos: string[] = [];
  mesesEventos: string[] = [];
  sedes: Sedes[] = [];
  dependencias: Dependencias[] = [];

  constructor(
    private eventoService: EventoService,
    private firestore: AngularFirestore,
    private modalController: ModalController // Inyecta AngularFirestore
  ) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
/*
      this.eventos.forEach(evento => {
        this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
          evento.fkIdSede = sede.Nombre; // Asigna el nombre de la sede al evento

          // Almacenar la sede en el arreglo
          this.sedes.push({
            IdSede: evento.fkIdSede,
            NombreSede: sede.NombreSede,
            TipoSede: sede.TipoSede,
            Calle: sede.Calle,
            CodigoPostal: sede.CodigoPostal,
            Colonia: sede.Colonia,
            Estado: sede.Estado,
            Municipio: sede.Municipio
          });

        });

        this.eventos.forEach(evento => {
          this.firestore.doc(evento.dependencias).valueChanges().subscribe((dependencia: any) => {
            evento.dependencias = dependencia.Nombre; // Asigna el nombre de la sede al evento
  
            this.dependencias.push({
              IdDependencia: evento.dependencias,
              NombreDependencia: dependencia.Nombre,
              TipoDependencia: dependencia.TipoDependencia,
              
            });
  
          });
        });
*/
this.eventos.forEach(evento => {
  this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
    if (sede) { // Asegúrate de que se haya encontrado la sede
      evento.fkIdSede = sede.Nombre;

      this.sedes.push({
        IdSede: evento.fkIdSede,
        NombreSede: sede.NombreSede,
        TipoSede: sede.TipoSede,
        Calle: sede.Calle,
        CodigoPostal: sede.CodigoPostal,
        Colonia: sede.Colonia,
        Estado: sede.Estado,
        Municipio: sede.Municipio
      });
    }
  });

  this.firestore.doc(evento.fkIdDependencias).valueChanges().subscribe((dependencia: any) => {
    if (dependencia) { // Asegúrate de que se haya encontrado la dependencia
      evento.fkIdDependencias = dependencia.Nombre;

      this.dependencias.push({
        IdDependencia: evento.fkIdDependencias,
        NombreDependencia: dependencia.Nombre,
        TipoDependencia: dependencia.TipoDependencia
      });
    }
  });
 
  



        // Obtener día y mes del evento
        const date = new Date(evento.fechaEvento.seconds * 1000); // Asegúrate de que fechaEvento sea un objeto Timestamp
        const day = date.getDate().toString().padStart(2, '0'); // Obtener día con dos dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes con dos dígitos
        this.diasEventos.push(day);
        this.mesesEventos.push(month);
        
      });
    });
  }

  async abrirModal(evento: Evento) {
    const sede = this.sedes.find(s => s.IdSede === evento.fkIdSede);
    const dependencia = this.dependencias.find(s => s.IdDependencia === evento.fkIdDependencias);
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        evento: evento, // Pasa el evento seleccionado al componente Detalles
        sede: sede,
        dependencia: dependencia
      }
    });
    return await modal.present();
  }
}