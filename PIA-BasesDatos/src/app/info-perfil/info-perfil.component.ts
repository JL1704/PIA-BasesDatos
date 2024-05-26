import { Component, OnInit } from '@angular/core';
import { SesionService } from '../usuario/sesion.service';
import { Cuenta } from '../interfaces/cuenta.interface';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.scss'],
})
export class InfoPerfilComponent  implements OnInit {

  cuenta: Cuenta | null = null;
  roles = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Usuario' },
    { id: 3, nombre: 'Invitado' }
  ];

  constructor(private sesionService: SesionService) {}

  ngOnInit() {
    this.cuenta = this.sesionService.obtenerCuentaActual();
  }

  obtenerNombreRol(id: number | undefined): string {
    if (id === undefined) {
      return 'No especificado';
    }
    const rol = this.roles.find(r => r.id === id);
    return rol ? rol.nombre : 'Desconocido';
  }

}
