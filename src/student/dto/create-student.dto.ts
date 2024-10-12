import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  telefono: string;
}
