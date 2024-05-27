export interface Registros{
    IdRegistro:number;
    FKIdEvento:number;
    NombreRegistro:string;
    CorreoRegistros:string;
    NumAsiento:number;
    FKIdPago?:number; 
}