import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { Student, StudentSchema } from './model/students.schema';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => UserModule),
  ],
  exports: [MongooseModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
