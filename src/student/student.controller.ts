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

  @Get('profile/:userId')
  async getStudentByUserId(@Param('userId') userId: string) {
    return this.studentService.getStudentByUserId(userId);
  }

  // @Get('profile/:userId')
  // async getStudentProfile(@Param('id') id: string) {
  //   return this.studentService.getStudentById(id);
  // }

  @Put(':userId')
  async updateStudentByUserId(
    @Param('userId') userId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    console.log('Updating student for userId:', userId);
    console.log('Update data:', updateStudentDto);
    return this.studentService.updateStudentByUserId(userId, updateStudentDto);
  }
}
