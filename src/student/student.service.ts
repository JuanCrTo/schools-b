import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { IStudent } from './interfaces/student.interface';
import { UpdateStudentDto } from './dto/update-student.dto';
// import { Student } from './model/student.schema';
import { IUser } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/model/user.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
  ) {}

  async findById(id: string): Promise<IUser> {
    const student = await this.userModel.findById(id).exec();
    return student;
  }

  async updateProfile(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IUser> {
    const updatedStudent = await this.userModel
      .findByIdAndUpdate(id, updateStudentDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException('Perfil de estudiante no encontrado');
    }

    return updatedStudent;
  }
}
