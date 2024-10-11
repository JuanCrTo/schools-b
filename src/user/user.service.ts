import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<IUser>,
  ) {}

  async registrarse(createUserDto: CreateUserDto): Promise<IUser> {
    const userExistente = await this.userModel.findOne({ email: createUserDto.email });
    if (userExistente) {
      throw new Error('El email ya está registrado');
    }
    const nuevouser = new this.userModel(createUserDto);
    return nuevouser.save();
  }
}
