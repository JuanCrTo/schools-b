import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: ['colegio', 'padre/estudiante'] })
  tipoUsuario: 'colegio' | 'padre/estudiante';

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  fechaRegistro: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
