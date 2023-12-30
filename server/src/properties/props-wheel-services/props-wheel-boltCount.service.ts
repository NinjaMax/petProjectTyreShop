import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBoltCount } from '../entities/wheels/wheel-boltCount.model';

@Injectable()
export class PropsWheelBoltCountService {
  constructor(@InjectModel(WheelBoltCount) private wheelBoltCountRepository: typeof WheelBoltCount,
  private wheelsService: WheelsService) {}

  async createWheelBoltCount(createPropertyDto: CreatePropertyDto) {
    try {
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelBoltCount = await this.wheelBoltCountRepository.findOne(
        { where: { bolt_count: createPropertyDto.bolt_count } })
        if(wheelId && wheelBoltCount) {
            const updateBoltCount = await this.wheelBoltCountRepository.update({
             bolt_count: createPropertyDto.bolt_count}, {where: {id_bolt_count: wheelBoltCount.id_bolt_count}});
            await wheelId.$set('bolt_count', updateBoltCount);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateBoltCount;
        } else if(wheelId && !wheelBoltCount) {
            const newWheelBoltCount = await this.wheelBoltCountRepository.create(createPropertyDto);
            await wheelId.$set('bolt_count', newWheelBoltCount);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelBoltCount;
        } else {
          const wheelBoltCount = await this.wheelBoltCountRepository.create(createPropertyDto);

          return wheelBoltCount;
        }
    } catch {
      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
    }
  }

  async createWheelBoltCountFromPrice(id: number, bolt_count: string) {
    try {
      const [wheelBoltCount, created] =
        await this.wheelBoltCountRepository.findOrCreate({
          where: { bolt_count: bolt_count },
          defaults: { bolt_count: bolt_count },
        }
      );
      if (created || !created) {
        await wheelBoltCount.$add('wheels', id);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelBoltCount() {
    try {
      const wheelAllBoltCount = await this.wheelBoltCountRepository.findAll({include: {all: true}});

      return wheelAllBoltCount;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findWheelBoltCountById(getPropertyDto: GetPropertyDto) {
    try {
      const boltCountId = await this.wheelBoltCountRepository.findByPk(getPropertyDto.id_bolt_count, {include: {all: true}});

      return boltCountId;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async updateWheelBoltCount( updatePropertyDto: UpdatePropertyDto) {
    try {
      const boltCountWheelId = await this.wheelBoltCountRepository.findByPk(updatePropertyDto.id_bolt_count, {include: {all: true}});
      if(boltCountWheelId) {
        const updateBoltCount = await this.wheelBoltCountRepository.update(
        { bolt_count: updatePropertyDto.bolt_count}, {where: {id_bolt_count: updatePropertyDto.id_bolt_count}});

        return updateBoltCount; 
      }
      return new HttpException(`Data "id_bolt_count" or "bolt_count" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async removeWheelBoltCount(getPropertyDto: GetPropertyDto) { 
    try {
      const removeWheelBoltCounts = await this.wheelBoltCountRepository.destroy({where: {id_bolt_count: getPropertyDto.id_bolt_count}});
      
      return removeWheelBoltCounts;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

}
