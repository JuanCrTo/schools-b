import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TipoUsuario } from '../interfaces/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: TipoUsuario })
  tipoUsuario: TipoUsuario;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  fechaRegistro: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
