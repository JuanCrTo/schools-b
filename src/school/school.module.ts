import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { School, SchoolSchema } from './model/school.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}