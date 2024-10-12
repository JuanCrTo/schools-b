import { Controller, Get, Put, Body, Param, Post } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post(':userId')
  async createStudent(
    @Param('userId') userId: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.createStudent(userId, createStudentDto);
  }

  @Get(':userId')
  async getStudentByUserId(@Param('userId') userId: string) {
    return this.studentService.getStudentByUserId(userId);
  }

  @Put(':userId')
  async updateStudentByUserId(
    @Param('userId') userId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudentByUserId(userId, updateStudentDto);
  }
}
