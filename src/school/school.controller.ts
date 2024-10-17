import { Controller, Get, Put, Body, Param, Post, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './model/school.schema';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/profile/:userId')
  async getSchoolByUserId(@Param('userId') userId: string) {
    return this.schoolService.getSchoolByUserId(userId);
  }

  @Get('profile/details/:id')
  async getSchoolProfile(@Param('id') id: string): Promise<School> {
    return await this.schoolService.getSchoolById(id); // Asegúrate de que este método exista
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

  @Get('filter/filtro')
  async filterSchools(
    @Query() createSchoolDto: CreateSchoolDto,
  ): Promise<School[]> {
    return await this.schoolService.filterSchools(createSchoolDto);
  }
}
