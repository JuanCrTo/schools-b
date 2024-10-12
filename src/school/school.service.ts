import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { ISchool } from './interfaces/school.interface';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './model/school.schema';
import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private readonly schoolModel: Model<IUser>,
  ) {}

  async getSchoolProfile(id: string): Promise<IUser> {
    const schoolProfile = await this.schoolModel.findById(id).exec();
    if (!schoolProfile) {
      throw new NotFoundException(`Colegio con ID ${id} no encontrado`);
    }
    return schoolProfile;
  }

  async updateSchoolProfile(
    id: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<IUser> {
    const updatedSchoolProfile = await this.schoolModel
      .findByIdAndUpdate(id, updateSchoolDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();

    if (!updatedSchoolProfile) {
      throw new NotFoundException(`Colegio con ID ${id} no encontrado`);
    }
    return updatedSchoolProfile;
  }
}
