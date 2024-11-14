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
  precioMensual: number;

  @IsNumber()
  precioMatricula: number;

  @IsNumber()
  icfes: number;

  @IsNumber()
  cantidadSalones: number;

  @IsNumber()
  cantidadGrados: number;
}
