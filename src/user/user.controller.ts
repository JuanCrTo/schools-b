// src/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { userService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class userController {
  constructor(private readonly userService: userService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.registrarse(createUserDto);
  }
}
