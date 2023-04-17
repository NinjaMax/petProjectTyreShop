import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelModel } from '../entities/wheels/wheel-model.model';

@Injectable()
export class PropsWheelModelService {
  constructor(@InjectModel(WheelModel) private wheelModelRepository: typeof WheelModel,
  private wheelsService: WheelsService) {}

  async createWheelModel(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelModel = await this.wheelModelRepository.findOne(
        { where: { model: createPropertyDto.model } })

        if(wheelId && wheelModel) {

            const updateModel = await this.wheelModelRepository.update({
             model: createPropertyDto.model}, {where: {id_model: wheelModel.id_model}});
            await wheelId.$set('model', updateModel);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateModel;

        } else if(wheelId && !wheelModel) {

            const newWheelModel = await this.wheelModelRepository.create(createPropertyDto);

            await wheelId.$set('model', newWheelModel);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelModel;

        } else {

            const wheelModel = await this.wheelModelRepository.create(createPropertyDto);

            return wheelModel;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelModelFromPrice( id: number, id_model: number, model: string) {

    try {

      const [wheelModel, created] = await this.wheelModelRepository.findOrCreate(
        {where: {id_model: id_model}, 
          defaults: {id_model: id_model, model: model}
        }
      );

      if(created || !created) {

       await wheelModel.$add('wheels', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelModel() {

    try {

      const wheelAllModel = await this.wheelModelRepository.findAll({include: {all: true}});

      return wheelAllModel;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelModelById(getPropertyDto: GetPropertyDto) {
    try {
      const modelId = await this.wheelModelRepository.findByPk(getPropertyDto.id_model, {include: {all: true}});

      return modelId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelModel( updatePropertyDto: UpdatePropertyDto) {

    try {

      const modelWheelId = await this.wheelModelRepository.findByPk(updatePropertyDto.id_model, {include: {all: true}});

      if(modelWheelId) {

        const updateModel = await this.wheelModelRepository.update(
        { model: updatePropertyDto.model}, {where: {id_model: updatePropertyDto.id_model}});

        return updateModel; 

      }

      return new HttpException(`Data "id_model" or "model" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelModel(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelModels = await this.wheelModelRepository.destroy({where: {id_model: getPropertyDto.id_model}});
      
      return removeWheelModels;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
