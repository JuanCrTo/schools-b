import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './interfaces/student.interface';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IStudent> {
    return await this.studentService.findById(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() student: UpdateStudentDto,
  ): Promise<IStudent> {
    return await this.studentService.updateProfile(id, student);
  }
}
