import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cuenta } from '../interfaces/cuenta.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private cuentas: Cuenta[] = [];
  private cuentaActual: Cuenta | null = null;

  constructor() {}

  iniciarSesion(cuenta: Partial<Cuenta>): Observable<any> {
    const user = this.cuentas.find(c => c.correo === cuenta.correo && c.contrasena === cuenta.contrasena);
    if (user) {
      this.cuentaActual = user;
      return of({ success: true, message: 'Sesión iniciada con éxito' });
    } else {
      return of({ success: false, message: 'Correo o contraseña incorrectos' });
    }
  }

  crearCuenta(cuenta: Cuenta): Observable<any> {
    const existe = this.cuentas.find(c => c.correo === cuenta.correo);
    if (!existe) {
      cuenta.id_Cuenta = this.cuentas.length + 1;
      this.cuentas.push(cuenta);
      return of({ success: true, message: 'Cuenta creada con éxito' });
    } else {
      return of({ success: false, message: 'El correo ya está en uso' });
    }
  }

  obtenerCuentaActual(): Cuenta | null {
    return this.cuentaActual;
  }
}
