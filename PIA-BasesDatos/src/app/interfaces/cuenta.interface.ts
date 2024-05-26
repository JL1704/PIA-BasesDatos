export interface Cuenta {
    id_Cuenta: number;
    nombre: string;
    correo: string;
    contrasena: string;
    fk_Id_Rol?: number;
  }
  