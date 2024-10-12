import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true, versionKey: false })
export class Student {  
  telefono: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
