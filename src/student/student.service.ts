import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from './interfaces/student.interface';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './model/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<IStudent>,
  ) {}

  async findById(id: string): Promise<IStudent> {
    const student = await this.studentModel.findById(id).exec();
    return student;
  }

  async updateProfile(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const updatedStudent = await this.studentModel
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
