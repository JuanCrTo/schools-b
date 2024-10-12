import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TipoInstitucion } from '../interfaces/school.interface';

export class CreateSchoolDto {
  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsEnum(TipoInstitucion)
  tipoInstitucion: TipoInstitucion;

  @IsNumber()
  numEstudiantes: number;

  @IsNumber()
  numProfesores: number;

  @IsString()
  descripcion: string;

  @IsString()
  servicios: string;
}
