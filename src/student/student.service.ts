import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './model/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  async createStudent(
    userId: string,
    createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    const newStudent = new this.studentModel({ ...createStudentDto, userId });
    return newStudent.save();
  }

  async getStudentByUserId(userId: string): Promise<Student> {
    const student = await this.studentModel.findOne({ userId }).exec();
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado para el usuario');
    }
    return student;
  }

  async updateStudentByUserId(
    userId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findOneAndUpdate({ userId }, updateStudentDto, { new: true })
      .exec();
    if (!updatedStudent) {
      throw new NotFoundException('Estudiante no encontrado para el usuario');
    }
    return updatedStudent;
  }
}
