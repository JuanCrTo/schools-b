import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Genero, TipoInstitucion } from '../interfaces/school.interface';

export class CreateSchoolDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;

  @IsString()
  descripcion: string;

  @IsString()
  servicios: string;

  @IsString()
  ubicacion: string;

  @IsEnum(Genero)
  genero: Genero;

  @IsEnum(TipoInstitucion)
  tipoInstitucion: TipoInstitucion;

  @IsNumber()
  numEstudiantes: number;

  @IsNumber()
  numProfesores: number;

  @IsNumber()
  precioMinMensual: number;

  @IsNumber()
  precioMaxMensual: number;

  @IsNumber()
  precioMinMatricula: number;

  @IsNumber()
  precioMaxMatricula: number;

  @IsNumber()
  icfesMinimo: number;

  @IsNumber()
  cantidadProfesoresMin: number;

  @IsNumber()
  cantidadProfesoresMax: number;

  @IsNumber()
  cantidadSalonesMin: number;

  @IsNumber()
  cantidadSalonesMax: number;

  @IsNumber()
  cantidadGradosMin: number;

  @IsNumber()
  cantidadGradosMax: number;

  @IsNumber()
  cantidadAlumnosMin: number;

  @IsNumber()
  cantidadAlumnosMax: number;
}
