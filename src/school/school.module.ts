import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { School, SchoolSchema } from './model/school.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [MongooseModule],
})
export class SchoolModule {}
