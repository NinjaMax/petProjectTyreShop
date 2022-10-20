import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TyreModel } from './entities/tyre-model.model';

@Injectable()
export class PropertiesModelService {
  constructor(@InjectModel(TyreModel) private tyreModelRepository: typeof TyreModel) {}

  async createTyreModel(createPropertyDto: CreatePropertyDto) {
    try {
      
      const tyreModel = await this.tyreModelRepository.create(createPropertyDto);

      return tyreModel;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllTyreModel() {

    try {

      const tyreAllModel = await this.tyreModelRepository.findAll({include: {all: true}});

      return tyreAllModel;

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

  async removeTyreModel(getPropertyDto: GetPropertyDto) { 
    try {

      const removeTyreModel = await this.tyreModelRepository.destroy({where: {id : getPropertyDto.id}});
      
      return removeTyreModel;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}