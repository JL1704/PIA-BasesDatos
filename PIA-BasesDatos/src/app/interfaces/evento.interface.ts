import { Timestamp } from "@angular/fire/firestore";

export interface Evento {
    idEvento: string;
    nombre: string;
    categoria: string;
    fkIdSede: string;
    fkIdDependencias: string;
    poster: string;
    temario: string;
    costos?: number;
    capacidad: number;
    disponibilidad?: string;
    fkIdInvitados?: string;
    fechaEvento: Timestamp;
    fechaCreacion: Timestamp;
  }
  