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

  async filterSchools(createSchoolDto: CreateSchoolDto): Promise<School[]> {
    const query: any = {};

    const filters = [
      { field: 'nombre', regex: true },
      { field: 'telefono', regex: true },
      { field: 'descripcion', regex: true },
      { field: 'servicios', regex: true },
      { field: 'ubicacion', regex: true },
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
        field: 'numEstudiantes', // Cambia este a 'numEstudiantes' si es lo que deseas
        minField: 'cantidadAlumnosMin',
        maxField: 'cantidadAlumnosMax',
      },
    ];
    
    rangeFilters.forEach(({ field, minField, maxField }) => {
      if (createSchoolDto[minField] !== undefined) {
        query[field] = { ...query[field], $gt: createSchoolDto[minField] }; // Cambia a $gt para min
      }
      if (createSchoolDto[maxField] !== undefined) {
        query[field] = { ...query[field], $lt: createSchoolDto[maxField] }; // Cambia a $lt para max
      }
    });

    return await this.schoolModel.find(query).exec();
  }
}
