import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventoService } from '../evento.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Evento } from '../interfaces/evento.interface';
import { Timestamp } from 'firebase/firestore';
import { SedeService } from '../sede.service';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss'],
})
export class EditarEventoComponent implements OnInit {
  @Input() evento: Evento = {
    idEvento: '',
    nombre: '',
    categoria: '',
    fkIdSede: '',
    fkIdDependencias: '',
    poster: '',
    temario: '',
    costos: 0,
    capacidad: 0,
    disponibilidad: '',
    fkIdInvitados: '',
    fechaEvento: Timestamp.now(), // Utiliza Timestamp.now() para obtener la fecha actual
    fechaCreacion: Timestamp.now() // Utiliza Timestamp.now() para obtener la fecha actual
  };
  eventoForm: FormGroup;
  selectedFile: File | null = null;

  sedes: any[] = []; // Definir sedes como un arreglo vacío
  dependencias: any[] = []; // Definir dependencias como un arreglo vacío

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private eventoService: EventoService,
    private firestore: AngularFirestore,
    private sedeService: SedeService
  ) {
    this.eventoForm = this.fb.group({
      categoria: ['', Validators.required],
      sede: ['', Validators.required],
      dependencia: ['', Validators.required],
      poster: [''],
      temarios: ['', Validators.required],
      precio: [null],
      capacidad: [0, Validators.required],
      disponibilidad: [''],
      invitados: [null],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Aquí puedes cargar los datos de sedes y dependencias desde tu servicio
    this.cargarSedes();
    this.cargarDependencias();

    // Inicializar el formulario con los datos del evento
    this.eventoForm.patchValue({
      categoria: this.evento.categoria,
      sede: this.evento.fkIdSede,
      dependencia: this.evento.fkIdDependencias, // Cambia fkIdDependencia por fkIdDependencias
      poster: this.evento.poster,
      temarios: this.evento.temario,
      precio: this.evento.costos,
      capacidad: this.evento.capacidad,
      disponibilidad: this.evento.disponibilidad,
      invitados: this.evento.fkIdInvitados,
      fecha: this.evento.fechaEvento.toDate()
    });
  }

  cargarSedes() {
    // Aquí puedes cargar los datos de sedes desde tu servicio y asignarlos a this.sedes
    this.sedeService.getSedes().subscribe(sedes => {
      this.sedes = sedes;
    });
  }

  cargarDependencias() {
    // Aquí puedes cargar los datos de dependencias desde tu servicio y asignarlos a this.dependencias
    this.sedeService.getDependencias().subscribe(dependencias => {
      this.dependencias = dependencias;
    });
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.eventoForm.valid) {
      const eventoId = this.evento.nombre; // Utilizar el nombre como ID
      const newData: any = {  // Usar any para newData
        categoria: this.eventoForm.value.categoria,
        fkIdSede: this.firestore.doc(`Sedes/${this.eventoForm.value.sede}`).ref,
        fkIdDependencia: this.firestore.doc(`Dependencias/${this.eventoForm.value.dependencia}`).ref,
        temario: this.eventoForm.value.temarios,
        costos: this.eventoForm.value.precio,
        capacidad: this.eventoForm.value.capacidad,
        disponibilidad: this.eventoForm.value.disponibilidad,
        fkIdInvitados: this.eventoForm.value.invitados,
        fechaEvento: new Date(this.eventoForm.value.fecha),
      };
  
      if (this.selectedFile) {
        this.eventoService.subirImagen(this.selectedFile, eventoId).subscribe(url => {
          newData['poster'] = url;
          this.actualizarEvento(eventoId, newData);
        });
      } else {
        this.actualizarEvento(eventoId, newData);
      }
    }
  }
  

  actualizarEvento(eventoId: string, newData: any) {
    this.eventoService.actualizarEvento(eventoId, newData).subscribe(() => {
      console.log('Evento actualizado con éxito');
      this.dismiss();
    }, error => {
      console.error('Error al actualizar evento:', error);
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
