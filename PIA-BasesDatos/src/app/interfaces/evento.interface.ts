export interface Evento {
    idEvento: number;
    nombre: string;
    categoria: string;
    fkIdSede: number;
    poster: string;
    temario: string;
    costos?: number;
    capacidad: number;
    disponibilidad?: string;
    fkIdInvitados?: number;
    fechaEvento: Date;
    fechaCreacion: Date;
  }
  