// src/user.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { userService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class userController {
  constructor(private readonly userService: userService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.registrarse(createUserDto);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new HttpException(
        'Error al registrar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
