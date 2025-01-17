import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolController } from './schools.controller';
import { SchoolService } from './schools.service';
import { School, SchoolSchema } from './model/schools.schema';
import { UserModule } from 'src/users/users.module';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, CloudinaryService],
  exports: [MongooseModule, CloudinaryService],
})
export class SchoolModule {}
