// src/interfaces/user.interface.ts
export interface user {
    id: string;
    nombre: string;
    email: string;
    password: string;
    fechaRegistro: Date;
    inscribirse(colegioId: string): void;
  }
  