import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TyreBrand } from './entities/tyre-brand.model';

@Injectable()
export class PropertiesBrandService {
  constructor(@InjectModel(TyreBrand) private tyreBrandRepository: typeof TyreBrand) {}

  async createTyreBrand(createPropertyDto: CreatePropertyDto) {
    try {
      
      const tyreBrand = await this.tyreBrandRepository.create(createPropertyDto);

      return tyreBrand;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllTyreBrand() {

    try {

      const tyreAllBrand = await this.tyreBrandRepository.findAll({include: {all: true}});

      return tyreAllBrand;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async removeTyreBrand(getPropertyDto: GetPropertyDto) { 
    try {

      const removeTyreBrand = await this.tyreBrandRepository.destroy({where: {id : getPropertyDto.id}});
      
      return removeTyreBrand;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
