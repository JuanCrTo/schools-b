import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { SchoolService } from './school.service';
// import { ISchool } from './interfaces/school.interface';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get(':id')
  async getSchoolProfile(@Param('id') id: string): Promise<IUser> {
    return await this.schoolService.getSchoolProfile(id);
  }

  @Put(':id')
  async updateSchoolProfile(
    @Param('id') id: string,
    @Body() school: UpdateSchoolDto,
  ): Promise<IUser> {
    return await this.schoolService.updateSchoolProfile(id, school);
  }
}
