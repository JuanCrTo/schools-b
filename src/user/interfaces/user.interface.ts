export enum TipoUsuario {
  Colegio = 'Colegio',
  PadreEstudiante = 'Padre/Estudiante',
}

export interface IUser {
  id: string;
  nombre: string;
  email: string;
  password: string;
  fechaRegistro: Date;
  tipoUsuario: TipoUsuario;
}
