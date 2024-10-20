export enum TipoUsuario {
  Colegio = 'Colegio',
  PadreEstudiante = 'Padre/Estudiante',
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  fechaRegistro: Date;
  tipoUsuario: TipoUsuario;
}

export interface ISimpleUser {
  id: string;
  name: string;
  tipoUsuario: TipoUsuario;
}
