import { Controller, Post, Body, Get, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.registrarse(createUserDto);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);

      if (error.message === 'El email ya está registrado') {
        throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Error al registrar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const userId = req.user.id;

      const user = await this.userService.obtenerUsuarioPorId(userId);
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        tipoUsuario: user.tipoUsuario,
      };
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      throw new HttpException('Error al obtener el perfil', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
