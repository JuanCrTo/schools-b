import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
// import { SchoolService } from './school.service';
// import { ISchool } from './interfaces/school.interface';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getSchoolProfile(@Param('id') id: string): Promise<IUser> {
    return await this.userService.obtenerUsuarioPorId(id);
  }

  @Put(':id')
  async updateSchoolProfile(
    @Param('id') id: string,
    @Body() school: UpdateSchoolDto,
  ): Promise<IUser> {
    const updatedSchoolProfile = await this.userService.updateUserById(
      id,
      school,
    );

    if (!updatedSchoolProfile) {
      throw new NotFoundException(`Colegio con ID ${id} no encontrado`);
    }

    return updatedSchoolProfile; // Retorna el perfil actualizado
  }
}
