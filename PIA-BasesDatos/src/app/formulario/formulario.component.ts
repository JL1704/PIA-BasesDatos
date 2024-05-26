import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from '../interfaces/evento.interface';
import { CreaEventoService } from '../crea-evento.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent  implements OnInit {

  eventoForm: FormGroup;

  constructor(private fb: FormBuilder, private formBuilder: FormBuilder, private creaEventoService: CreaEventoService) {
    this.eventoForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required],
      categoria: ['', Validators.required],
      sede: ['', Validators.required],
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
  

  ngOnInit() {}

}
