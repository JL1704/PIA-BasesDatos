/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from '../interfaces/evento.interface';
import { CreaEventoService } from '../crea-evento.service';
import { ModalController } from '@ionic/angular';
import { FormSedeComponent } from '../form-sede/form-sede.component';
import { FormDependenciaComponent } from '../form-dependencia/form-dependencia.component';
import { SedeService } from '../sede.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent  implements OnInit {

  eventoForm: FormGroup;
  sedes: any[] = []; // Variable para almacenar las sedes
  dependencias: any[] = [];


  constructor(private fb: FormBuilder, 
    private formBuilder: FormBuilder, 
    private creaEventoService: CreaEventoService, 
    private modalController: ModalController,
    private sedeService: SedeService) {
    this.eventoForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required],
      categoria: ['', Validators.required],
      sede: ['', Validators.required],
      dependencia: ['', Validators.required],
      poster: ['', Validators.required],
      temarios: ['', Validators.required],
      precio: [null],
      capacidad: [0, Validators.required],
      disponibilidad: [''],
      invitados: [null],
      fecha: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      // Handle file upload here
      this.eventoForm.patchValue({
        poster: file.name
      });
    }
  }

  onSubmit() {
    if (this.eventoForm.valid) {
      const evento: Partial<Evento> = {
        nombre: this.eventoForm.value.nombreEvento,
        categoria: this.eventoForm.value.categoria,
        fkIdSede: this.eventoForm.value.sede,
        poster: this.eventoForm.value.poster,
        temario: this.eventoForm.value.temarios,
        costos: this.eventoForm.value.precio,
        capacidad: this.eventoForm.value.capacidad,
        disponibilidad: this.eventoForm.value.disponibilidad,
        fkIdInvitados: this.eventoForm.value.invitados,
        fechaEvento: new Date(this.eventoForm.value.fecha),
        fechaCreacion: new Date() // Assuming creation date is now
      };

      // Llamar al servicio para crear el evento
      this.creaEventoService.crearEvento(evento as Evento).subscribe(
        response => {
          console.log('Evento creado con éxito:', response);
          // Aquí podrías redirigir a una página de confirmación o realizar otra acción
        },
        error => {
          console.error('Error al crear evento:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      );
    }
  }

  async openSedeModal() {
    const modal = await this.modalController.create({
      component: FormSedeComponent,
      cssClass: 'my-custom-class' // Puedes añadir una clase CSS personalizada si es necesario
    });
    return await modal.present();
  }

  async openDependenciaModal() {
    const modal = await this.modalController.create({
      component: FormDependenciaComponent,
      cssClass: 'my-custom-class' // Puedes añadir una clase CSS personalizada si es necesario
    });
    return await modal.present();
  }  

  async ngOnInit() {
    // Obtener las sedes al inicializar el componente
    this.sedeService.getSedes().subscribe(sedes => {
      this.sedes = sedes;
    });

    // Obtener las dependencias al inicializar el componente
    this.sedeService.getDependencias().subscribe(dependencias => {
      this.dependencias = dependencias;
    });

  }
}*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SedeService } from '../sede.service';
import { EventoService } from '../evento.service';
import { FormSedeComponent } from '../form-sede/form-sede.component';
import { FormDependenciaComponent } from '../form-dependencia/form-dependencia.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  eventoForm: FormGroup;
  sedes: any[] = [];
  dependencias: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private formBuilder: FormBuilder, 
    private modalController: ModalController,
    private sedeService: SedeService,
    private eventoService: EventoService,
    private firestore: AngularFirestore
  ) {
    this.eventoForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required],
      categoria: ['', Validators.required],
      sede: ['', Validators.required],
      dependencia: ['', Validators.required],
      poster: ['', Validators.required],
      temarios: ['', Validators.required],
      precio: [null],
      capacidad: [0, Validators.required],
      disponibilidad: [''],
      invitados: [null],
      fecha: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.sedeService.getSedes().subscribe(sedes => {
      this.sedes = sedes;
    });

    this.sedeService.getDependencias().subscribe(dependencias => {
      this.dependencias = dependencias;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.eventoForm.patchValue({
        poster: this.selectedFile.name
      });
    }
  }

  onSubmit() {
    if (this.eventoForm.valid && this.selectedFile) {
      const nombreEvento = this.eventoForm.value.nombreEvento;
      this.eventoService.subirImagen(this.selectedFile, nombreEvento).pipe(
        switchMap(url => {
          const evento = {
            nombre: this.eventoForm.value.nombreEvento,
            categoria: this.eventoForm.value.categoria,
            fkIdSede: this.firestore.doc(`Sedes/${this.eventoForm.value.sede}`).ref,
            fkIdDependencia: this.firestore.doc(`Dependencias/${this.eventoForm.value.dependencia}`).ref,
            poster: url,
            temario: this.eventoForm.value.temarios,
            costos: this.eventoForm.value.precio,
            capacidad: this.eventoForm.value.capacidad,
            disponibilidad: this.eventoForm.value.disponibilidad,
            fkIdInvitados: this.eventoForm.value.invitados,
            fechaEvento: new Date(this.eventoForm.value.fecha),
            fechaCreacion: new Date()
          };
          return this.eventoService.crearEvento(evento, nombreEvento);
        })
      ).subscribe(
        () => {
          console.log('Evento creado con éxito');
        },
        error => {
          console.error('Error al crear evento:', error);
        }
      );
    }
  }

  async openSedeModal() {
    const modal = await this.modalController.create({
      component: FormSedeComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async openDependenciaModal() {
    const modal = await this.modalController.create({
      component: FormDependenciaComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}

