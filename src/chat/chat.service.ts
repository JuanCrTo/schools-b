import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from 'src/schools/model/schools.schema';
import { Student } from 'src/students/model/students.schema';
import {
  ISimpleUser,
  TipoUsuario,
} from 'src/users/interfaces/users.interface';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async getUsers(): Promise<ISimpleUser[]> {
    const schools = await this.schoolModel
      .find()
      .select('name userId')
      .lean()
      .exec();
    const students = await this.studentModel
      .find()
      .select('name userId')
      .lean()
      .exec();

    const users: ISimpleUser[] = [
      ...schools.map((school) => ({
        id: school.userId,
        name: school.nombre,
        tipoUsuario: TipoUsuario.Colegio,
      })),
      ...students.map((student) => ({
        id: student.userId,
        name: student.nombre,
        tipoUsuario: TipoUsuario.PadreEstudiante,
      })),
    ];

    return users;
  }
}
