export enum TipoInstitucion {
  PRIVADO = 'Privado',
  PUBLICO = 'Publico',
}

export interface ISchool {
  telefono: string;
  direccion: string;
  tipoInstitucion: TipoInstitucion;
  numEstudiantes: number;
  numProfesores: number;
  descripcion: string;
  servicios: string[];
}
