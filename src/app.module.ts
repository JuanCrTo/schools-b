import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('Conectando a MongoDB en:', process.env.MONGO_URL);


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), UserModule, SchoolModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
