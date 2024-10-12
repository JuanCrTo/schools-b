import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;
}
