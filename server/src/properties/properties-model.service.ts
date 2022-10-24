import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TyreModel } from './entities/tyre-model.model';
import { TyresService } from 'src/tyres/tyres.service';

@Injectable()
export class PropertiesModelService {
  constructor(@InjectModel(TyreModel) private tyreModelRepository: typeof TyreModel, 
  private tyresService: TyresService) {}

  async createTyreModel(createPropertyDto: CreatePropertyDto) {
 
    try {

        const tyres = await this.tyresService.findTyresById(createPropertyDto);

       if(tyres) {

        const tyreModel = await this.tyreModelRepository.create(createPropertyDto);
        
        await tyreModel.$add('tyres', [createPropertyDto.id_tyres])

        tyreModel.tyres.push(tyres);

        return tyreModel;

      } else {

        return new HttpException(`Data ${createPropertyDto.id_tyres} not found`, HttpStatus.NOT_FOUND);

      }

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

  async findModelById(getPropertyDto: GetPropertyDto) {

    try {

      const modelId = await this.tyreModelRepository.findByPk(getPropertyDto.id, {include: {all: true}});

      return modelId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async updateTyreModel(updatePropertyDto: UpdatePropertyDto) {

    try {

      const modelTyresId = await this.tyreModelRepository.findByPk(updatePropertyDto.id, {include: {all: true}});
      const tyresId = await this.tyresService.findTyresById(updatePropertyDto);

      if(modelTyresId) {

        await this.tyreModelRepository.update(
        { model : updatePropertyDto.model, 
          id : updatePropertyDto.id,
          tyres: modelTyresId.tyres
        }, {where: {id : updatePropertyDto.id}});

        const updateBrand = modelTyresId.tyres.find( item => item.id == updatePropertyDto.id_tyres);
       
        if(!updateBrand) {

          await modelTyresId.$add('tyres', [updatePropertyDto.id_tyres])
          modelTyresId.tyres.push(tyresId);

        }

        const updateTyreModel = await this.tyreModelRepository.findByPk(updatePropertyDto.id, {include: {all: true}});

        return updateTyreModel; 

      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
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