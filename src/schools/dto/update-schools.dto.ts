import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolDto } from './create-schools.dto';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {}
