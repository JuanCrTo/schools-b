import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true, versionKey: false })
export class Student {
  @Prop({required: true})
  userId: string;

  @Prop({ required: false, default: '' })
  nombre: string;

  @Prop({ required: false, default: '' })
  telefono: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
