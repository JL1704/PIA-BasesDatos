/*import { Component, OnInit } from '@angular/core';
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
  nombresDependencias: string[] = [];


  constructor(
    private eventoService: EventoService,
    private firestore: AngularFirestore,
    private modalController: ModalController // Inyecta AngularFirestore
  ) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;

      this.eventos.forEach(evento => {
        this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
          if (sede) {
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
          if (dependencia) {
            evento.fkIdDependencias = dependencia.Nombre;

            this.dependencias.push({
              IdDependencia: evento.fkIdDependencias,
              NombreDependencia: dependencia.Nombre,
              TipoDependencia: dependencia.TipoDependencia
            });

            // Almacenar el nombre de la dependencia en el arreglo nombresDependencias
            this.nombresDependencias.push(dependencia.Nombre);
          }
        });


        const date = new Date(evento.fechaEvento.seconds * 1000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
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
        evento: evento,
        sede: sede,
        dependencia: dependencia
      }
    });
    return await modal.present();
  }
}*/

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
  nombresDependencias: string[] = [];
  filteredEventos: any[] = [];
  searchTerm: string = '';

  constructor(
    private eventoService: EventoService,
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
  
      this.eventos.forEach(evento => {
        this.firestore.doc(evento.fkIdSede).valueChanges().subscribe((sede: any) => {
          if (sede) {
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
  
        const dependenciaRef = evento.fkIdDependencias;
        this.firestore.doc(dependenciaRef).valueChanges().subscribe((dependencia: any) => {
          if (dependencia) {
            console.log('Dependencia:', dependencia); // Verificar los datos de la dependencia en la consola
            evento.fkIdDependencias = dependencia.Nombre;
  
            this.dependencias.push({
              IdDependencia: evento.fkIdDependencias,
              NombreDependencia: dependencia.Nombre,
              TipoDependencia: dependencia.TipoDependencia
            });
  
            // Almacenar el nombre de la dependencia en el arreglo nombresDependencias
            this.nombresDependencias.push(dependencia.Nombre);
            console.log('Nombres de dependencias:', this.nombresDependencias); // Verificar los nombres de las dependencias en la consola
          }
        });
  
        const date = new Date(evento.fechaEvento.seconds * 1000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        this.diasEventos.push(day);
        this.mesesEventos.push(month);
      });
    });
  }

  /*filterItems() {
    this.filteredEventos = this.eventos.filter(evento =>
      evento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/

  filterItems() {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todos los eventos
      this.filteredEventos = this.eventos;
    } else {
      // Si hay un término de búsqueda, filtrar los eventos
      this.filteredEventos = this.eventos.filter(evento =>
        evento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  

  async abrirModal(evento: Evento) {
    const sede = this.sedes.find(s => s.IdSede === evento.fkIdSede);
    const dependencia = this.dependencias.find(s => s.IdDependencia === evento.fkIdDependencias);
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        evento: evento,
        sede: sede,
        dependencia: dependencia
      }
    });
    return await modal.present();
  }
}
