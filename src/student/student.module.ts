import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './Student.controller';
import { StudentService } from './Student.service';
import { Student, StudentSchema } from './model/Student.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}