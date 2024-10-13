import { Controller, Get, Put, Body, Param, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './model/school.schema';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get(':userId')
  async getSchoolByUserId(@Param('userId') userId: string) {
    return this.schoolService.getSchoolByUserId(userId);
  }

  @Post(':userId')
  async createSchool(
    @Param('userId') userId: string,
    @Body() createSchoolDto: CreateSchoolDto,
  ) {
    return this.schoolService.createSchoolProfile(userId, createSchoolDto);
  }

  @Put(':userId')
  async updateSchoolByUserId(
    @Param('userId') userId: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.updateSchoolByUserId(userId, updateSchoolDto);
  }

  @Get()
  async getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  @Post('filter')
  async filterSchools(@Body() createSchoolDto: CreateSchoolDto): Promise<School[]> {
    return await this.schoolService.filterSchools(createSchoolDto);
  }
}
