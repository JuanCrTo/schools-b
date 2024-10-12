import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TipoInstitucion } from '../interfaces/school.interface';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true, versionKey: false })
export class School {  
  telefono: string;
  
  direccion: string;
  
  @Prop({ required: true, enum: TipoInstitucion })
  tipoInstitucion: TipoInstitucion;
  
  numEstudiantes: number;
  
  numProfesores: number;
  
  descripcion: string;
  
  servicios: string[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);
