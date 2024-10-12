import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolController } from './School.controller';
import { SchoolService } from './School.service';
import { School, SchoolSchema } from './model/School.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}