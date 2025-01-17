import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { SchoolModule } from './schools/schools.module';
import { StudentModule } from './students/students.module';
import { ChatModule } from './chat/chat.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

dotenv.config();

console.log('Conectando a MongoDB en:', process.env.MONGO_URL_LOCAL);

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: memoryStorage() // Usa almacenamiento en memoria
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL_LOCAL),
    UserModule,
    SchoolModule,
    StudentModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
