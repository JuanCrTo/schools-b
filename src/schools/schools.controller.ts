import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { SchoolService } from './schools.service';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { CreateSchoolDto } from './dto/create-schools.dto';
import { School } from './model/schools.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';


@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //Obtener perfil con el id del usuario
  @Get('profile/:userId')
  async getSchoolByUserId(@Param('userId') userId: string) {
    return this.schoolService.getSchoolByUserId(userId);
  }

  //Detalles de la escuela con el id del colegio
  @Get('profile/details/:id')
  async getSchoolProfile(@Param('id') id: string): Promise<School> {
    return await this.schoolService.getSchoolById(id);
  }

  @Post(':userId')
  async createSchool(
    @Param('userId') userId: string,
    @Body() createSchoolDto: CreateSchoolDto,
  ) {
    return this.schoolService.createSchoolProfile(userId, createSchoolDto);
  }

  //Actualizar datos del colegio con el id del usuario
  @Put(':userId')
  async updateSchoolByUserId(
    @Param('userId') userId: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolService.updateSchoolByUserId(userId, updateSchoolDto);
  }

  @Get()
  async getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  //Filtrar escuelas
  @Get('filter/filtro')
  async filterSchools(
    @Query() createSchoolDto: CreateSchoolDto,
  ): Promise<School[]> {
    return await this.schoolService.filterSchools(createSchoolDto);
  }

  // Subir imagen con el id del colegio
  @Post('upload-image/:schoolId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('schoolId') schoolId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadImage(file, schoolId);
  }

  // Eliminar imagen con el id
  @Delete('delete-image/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    return await this.cloudinaryService.deleteImage(publicId);
  }
}
