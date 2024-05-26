import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent  implements OnInit {

  eventoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventoForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      categoria: ['', Validators.required],
      sede: ['', Validators.required],
      poster: [null],
      temarios: ['', Validators.required],
      precio: [''],
      capacidad: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  onFileChange(event: any) {  // Añadir tipo al parámetro event
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.eventoForm.patchValue({
          poster: reader.result
        });
      };
    }
  }

  onSubmit() {
    if (this.eventoForm.valid) {
      console.log(this.eventoForm.value);
      // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
    }
  }

  ngOnInit() {}

}
