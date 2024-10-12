import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TipoInstitucion } from '../interfaces/school.interface';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true, versionKey: false })
export class School {
  @Prop({required: true})
  userId: string;

  @Prop({ required: false, default: '' })
  nombre: string;

  @Prop({ required: false, default: '' })
  telefono: string;

  @Prop({ required: false, default: '' })
  direccion: string;

  @Prop({ required: false, default: '' })
  tipoInstitucion: TipoInstitucion;

  @Prop({ required: false, default: '' })
  numEstudiantes: number;

  @Prop({ required: false, default: '' })
  numProfesores: number;

  @Prop({ required: false, default: '' })
  descripcion: string;

  @Prop({ required: false, default: '' })
  servicios: string[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);
