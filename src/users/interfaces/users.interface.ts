export enum TipoUsuario {
  Colegio = 'Colegio',
  PadreEstudiante = 'Estudiante',
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  tipoUsuario: TipoUsuario;
}

export interface ISimpleUser {
  id: string;
  name: string;
  tipoUsuario: TipoUsuario;
}
