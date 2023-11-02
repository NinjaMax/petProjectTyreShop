import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelType } from '../entities/wheels/wheel-type.model';

@Injectable()
export class PropsWheelTypeService {
  constructor(@InjectModel(WheelType) private wheelTypeRepository: typeof WheelType,
  private wheelsService: WheelsService) {}

  async createWheelType(createPropertyDto: CreatePropertyDto) {
    try {
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelType = await this.wheelTypeRepository.findOne(
        { where: { type: createPropertyDto.type } })
        if(wheelId && wheelType) {
            const updateType = await this.wheelTypeRepository.update({
             type: createPropertyDto.type}, {where: {id_type: wheelType.id_type}});
            await wheelId.$set('type', updateType);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();
            return updateType;
        } else if(wheelId && !wheelType) {
            const newWheelType = await this.wheelTypeRepository.create(createPropertyDto);
            await wheelId.$set('type', newWheelType);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();
            return newWheelType;
        } else {
            const wheelType = await this.wheelTypeRepository.create(createPropertyDto);
            return wheelType;
        }
    } catch {
      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
    }

  }

  async createWheelTypeFromPrice( id: number, id_type: string, type: string) {
    try {
      const [wheelType, created] = await this.wheelTypeRepository.findOrCreate(
        {where: {type: type}, defaults: {id_type: id_type, type: type}}
      );
      if (created || !created) {
        await wheelType.$add('wheels', id);
      }
    } catch (error) {
      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
    }
  }

  async findAllWheelType() {
    try {
      const wheelAllType = await this.wheelTypeRepository.findAll({include: {all: true}});
      return wheelAllType;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findWheelTypeById(getPropertyDto: GetPropertyDto) {
    try {
      const typeId = await this.wheelTypeRepository.findByPk(getPropertyDto.id_type, {include: {all: true}});
      return typeId;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async updateWheelType( updatePropertyDto: UpdatePropertyDto) {
    try {
      const typeWheelId = await this.wheelTypeRepository.findByPk(updatePropertyDto.id_type, {include: {all: true}});
      if(typeWheelId) {
        const updateType = await this.wheelTypeRepository.update(
        { type: updatePropertyDto.type}, {where: {id_type: updatePropertyDto.id_type}});
        return updateType; 
      }
      return new HttpException(`Data "id_type" or "type" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async removeWheelType(getPropertyDto: GetPropertyDto) { 
    try {
      const removeWheelTypes = await this.wheelTypeRepository.destroy({where: {id_type: getPropertyDto.id_type}});
      return removeWheelTypes;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

}
