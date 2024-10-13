import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateSchoolDto } from 'src/school/dto/update-school.dto';
import { School } from 'src/school/model/school.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
    @InjectModel(School.name) private readonly schoolModel: Model<School>,
  ) {}

  async registrarse(createUserDto: CreateUserDto): Promise<IUser> {
    const userExistente = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExistente) {
      throw new Error('El email ya está registrado');
    }

    // Hashear la contraseña antes de guardarla
    const passwordHashed = await bcrypt.hash(createUserDto.password, 10);
    const nuevoUser = new this.userModel({
      ...createUserDto,
      password: passwordHashed, // Almacena la contraseña hasheada
    });

    const savedUser = await nuevoUser.save();

    // Si el tipoUsuario es "colegio", crear un registro en la colección 'school'
    if (createUserDto.tipoUsuario === 'Colegio') {
      const nuevaSchool = new this.schoolModel({
        userId: savedUser._id, // Asignar el userId del nuevo usuario
        // Dejar los demás campos vacíos o con valores predeterminados
      });
      await nuevaSchool.save();
    }

    return savedUser;
  }

  async obtenerUsuarioPorId(userId: string): Promise<IUser | null> {
    return this.userModel.findById(userId).exec();
  }

  async iniciarSesion(email: string, password: string): Promise<IUser | null> {
    const usuario = await this.userModel.findOne({ email }).exec();
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      throw new Error('Credenciales inválidas');
    }

    return usuario;
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateSchoolDto,
  ): Promise<IUser | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();

    return updatedUser;
  }
}
