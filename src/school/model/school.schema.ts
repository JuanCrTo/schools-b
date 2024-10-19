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
  precioMensual: number;

  @Prop({ required: false, default: 0 })
  precioMatricula: number;

  @Prop({ required: false, default: 0 })
  icfes: number;

  @Prop({ required: false, default: 0 })
  cantidadSalones: number;

  @Prop({ required: false, default: 0 })
  cantidadGrados: number;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
