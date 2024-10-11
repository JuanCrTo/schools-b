// src/user.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class userService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<user>,
  ) {}

  async registrarse(createUserDto: CreateUserDto): Promise<user> {
    const nuevouser = new this.userModel(createUserDto);
    return nuevouser.save();
  }
}
