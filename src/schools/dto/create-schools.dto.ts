import { IsString, IsNumber, IsEnum, Max, Min } from 'class-validator';
import { Genero, TipoInstitucion } from '../interfaces/schools.interface';

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
  @Min(0)
  @Max(500, { message: 'El valor del ICFES no puede ser mayor a 500' })
  icfes: number;

  @IsNumber()
  cantidadSalones: number;

  @IsNumber()
  cantidadGrados: number;
}
