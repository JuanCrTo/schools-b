import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './model/school.schema';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private readonly schoolModel: Model<School>,
  ) {}

  async getSchoolByUserId(userId: string): Promise<School> {
    const school = await this.schoolModel.findOne({ userId }).exec();
    if (!school) {
      throw new NotFoundException('Colegio no encontrado para el usuario');
    }
    return school;
  }

  async updateSchoolByUserId(
    userId: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    const updatedSchool = await this.schoolModel
      .findOneAndUpdate({ userId }, updateSchoolDto, { new: true })
      .exec();
    if (!updatedSchool) {
      throw new NotFoundException('Colegio no encontrado para el usuario');
    }
    return updatedSchool;
  }

  async createSchoolProfile(
    userId: string,
    createSchoolDto: CreateSchoolDto,
  ): Promise<School> {
    // Asignamos el userId recibido al nuevo registro de school
    const newSchool = new this.schoolModel({
      ...createSchoolDto,
      userId, // Relacionamos este school con el userId del usuario
    });
    return await newSchool.save();
  }

  async getAllSchools(): Promise<School[]> {
    return await this.schoolModel.find().exec(); // Obtiene todos los colegios
  }
}
