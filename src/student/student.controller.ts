import { Controller, Get, Put, Body, Param } from '@nestjs/common';
// import { StudentService } from './student.service';
// import { IStudent } from './interfaces/student.interface';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('student')
export class StudentController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IUser> {
    return await this.userService.obtenerUsuarioPorId(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() student: UpdateStudentDto,
  ): Promise<IUser> {
    return await this.userService.updateUserById(id, student);
  }
}
