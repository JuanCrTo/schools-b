import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { TipoUsuario } from '../interfaces/user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEnum(TipoUsuario, { message: 'El tipo de usuario debe ser Colegio o Padre/Estudiante' })
  tipoUsuario: TipoUsuario;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/, {
    message: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.',
  })
  password: string;
}
