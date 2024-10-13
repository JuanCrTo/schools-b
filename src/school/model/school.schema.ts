import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Genero, TipoInstitucion } from '../interfaces/school.interface';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true, versionKey: false })
export class School {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, default: '' })
  nombre: string;

  @Prop({ required: false, default: '' })
  telefono: string;

  @Prop({ required: false, default: '' })
  descripcion: string;

  @Prop({ required: false, default: '' })
  servicios: string;

  @Prop({ required: false, default: '' })
  ubicacion: string;

  @Prop({ required: false, default: '' })
  genero: Genero;

  @Prop({ required: false, default: '' })
  tipoInstitucion: TipoInstitucion;

  @Prop({ required: false, default: 0 })
  numEstudiantes: number;

  @Prop({ required: false, default: 0 })
  numProfesores: number;

  @Prop({ required: false, default: 0 })
  precioMinMensual: number;

  @Prop({ required: false, default: 0 })
  precioMaxMensual: number;

  @Prop({ required: false, default: 0 })
  precioMinMatricula: number;

  @Prop({ required: false, default: 0 })
  precioMaxMatricula: number;

  @Prop({ required: false, default: 0 })
  icfesMinimo: number;

  @Prop({ required: false, default: 0 })
  cantidadProfesoresMin: number;

  @Prop({ required: false, default: 0 })
  cantidadProfesoresMax: number;

  @Prop({ required: false, default: 0 })
  cantidadSalonesMin: number;

  @Prop({ required: false, default: 0 })
  cantidadSalonesMax: number;

  @Prop({ required: false, default: 0 })
  cantidadGradosMin: number;

  @Prop({ required: false, default: 0 })
  cantidadGradosMax: number;

  @Prop({ required: false, default: 0 })
  cantidadAlumnosMin: number;

  @Prop({ required: false, default: 0 })
  cantidadAlumnosMax: number;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
