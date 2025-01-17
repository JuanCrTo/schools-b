import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { School } from './model/schools.schema';
import { CreateSchoolDto } from './dto/create-schools.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private readonly schoolModel: Model<School>,
  ) {}

  async getSchoolByUserId(userId: string): Promise<School> {
    const school = await this.schoolModel.findOne({ userId }).exec();
    if (!school) {
      throw new NotFoundException('Colegio no encontrado para el usuaria');
    }
    return school;
  }

  async getSchoolById(id: string): Promise<School> {
    const school = await this.schoolModel.findById(id).exec();
    if (!school) {
      throw new NotFoundException('Colegio no encontrado');
    }
    return school;
  }

  async updateSchoolByUserId(
    userId: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    if (updateSchoolDto.icfes > 500) {
      throw new Error('El valor del ICFES no puede ser mayor a 500');
    }
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
    const newSchool = new this.schoolModel({
      ...createSchoolDto,
      userId,
    });
    return await newSchool.save();
  }

  async getAllSchools(): Promise<School[]> {
    return await this.schoolModel.find().exec(); // Obtiene todos los colegios
  }

  async filterSchools(createSchoolDto: CreateSchoolDto): Promise<School[]> {
    const query: any = {};

    const filters = [
      { field: 'nombre', regex: true },
      { field: 'genero' },
      { field: 'tipoInstitucion' },
      { field: 'numEstudiantes' },
      { field: 'numProfesores' },
      { field: 'precioMensual' },
      { field: 'precioMatricula' },
      { field: 'icfes' },
      { field: 'cantidadSalones' },
      { field: 'cantidadGrados' },
    ];

    filters.forEach(({ field, regex }) => {
      if (createSchoolDto[field]) {
        query[field] = regex
          ? { $regex: createSchoolDto[field], $options: 'i' }
          : createSchoolDto[field];
      }
    });

    const priceFilters = [
      {
        field: 'precioMensual',
        minField: 'precioMinMensual',
        maxField: 'precioMaxMensual',
      },
      {
        field: 'precioMatricula',
        minField: 'precioMinMatricula',
        maxField: 'precioMaxMatricula',
      },
    ];

    priceFilters.forEach(({ field, minField, maxField }) => {
      if (createSchoolDto[minField]) {
        query[field] = { ...query[field], $gte: createSchoolDto[minField] };
      }
      if (createSchoolDto[maxField]) {
        query[field] = { ...query[field], $lte: createSchoolDto[maxField] };
      }
    });

    const rangeFilters = [
      {
        field: 'cantidadProfesores',
        minField: 'cantidadProfesoresMin',
        maxField: 'cantidadProfesoresMax',
      },
      {
        field: 'cantidadSalones',
        minField: 'cantidadSalonesMin',
        maxField: 'cantidadSalonesMax',
      },
      {
        field: 'cantidadGrados',
        minField: 'cantidadGradosMin',
        maxField: 'cantidadGradosMax',
      },
      {
        field: 'numEstudiantes',
        minField: 'cantidadAlumnosMin',
        maxField: 'cantidadAlumnosMax',
      },
    ];

    rangeFilters.forEach(({ field, minField, maxField }) => {
      if (createSchoolDto[minField] !== undefined) {
        query[field] = { ...query[field], $gte: createSchoolDto[minField] };
      }
      if (createSchoolDto[maxField] !== undefined) {
        query[field] = { ...query[field], $lte: createSchoolDto[maxField] };
      }
    });

    if (createSchoolDto.icfes !== undefined) {
      query.icfes = { $gte: createSchoolDto.icfes };
    }

    return await this.schoolModel.find(query).exec();
  }
}
