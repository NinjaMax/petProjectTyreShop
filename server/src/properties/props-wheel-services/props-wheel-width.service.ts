import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelWidth } from '../entities/wheels/wheel-width.model';

@Injectable()
export class PropsWheelWidthService {
  constructor(@InjectModel(WheelWidth) private wheelWidthRepository: typeof WheelWidth,
  private wheelsService: WheelsService) {}

  async createWheelWidth(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelWidth = await this.wheelWidthRepository.findOne(
        { where: { width: createPropertyDto.width } })

        if(wheelId && wheelWidth) {

            const updateWidth = await this.wheelWidthRepository.update({
             width: createPropertyDto.width}, {where: {id_width: wheelWidth.id_width}});
            await wheelId.$set('width', updateWidth);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateWidth;

        } else if(wheelId && !wheelWidth) {

            const newWheelWidth = await this.wheelWidthRepository.create(createPropertyDto);

            await wheelId.$set('width', newWheelWidth);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelWidth;

        } else {

            const wheelWidth = await this.wheelWidthRepository.create(createPropertyDto);

            return wheelWidth;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelWidthFromPrice( id: number, width: number) {

    try {

        const wheelId = await this.wheelsService.findWheelByIdPrice(id);
        const wheelWidth = await this.wheelWidthRepository.findOne(
        { where: { width: width } })

        if(wheelId && wheelWidth) {

            const updateWidth = await this.wheelWidthRepository.update({
             width: width}, {where: {id_width: wheelWidth.id_width}});
            await wheelId.$set('width', updateWidth);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateWidth;

        } else if(wheelId && !wheelWidth) {

            const newWheelWidth = await this.wheelWidthRepository.create({width});

            await wheelId.$set('width', newWheelWidth);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelWidth;

        } else {

            const wheelWidth = await this.wheelWidthRepository.create({width});

            return wheelWidth;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelWidth() {

    try {

      const wheelAllWidth = await this.wheelWidthRepository.findAll({include: {all: true}});

      return wheelAllWidth;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelWidthById(getPropertyDto: GetPropertyDto) {
    try {
      const widthId = await this.wheelWidthRepository.findByPk(getPropertyDto.id_width, {include: {all: true}});

      return widthId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelWidth( updatePropertyDto: UpdatePropertyDto) {

    try {

      const widthWheelId = await this.wheelWidthRepository.findByPk(updatePropertyDto.id_width, {include: {all: true}});

      if(widthWheelId) {

        const updateWidth = await this.wheelWidthRepository.update(
        { width: updatePropertyDto.width}, {where: {id_width: updatePropertyDto.id_width}});

        return updateWidth; 

      }

      return new HttpException(`Data "id_width" or "width" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelWidth(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelWidths = await this.wheelWidthRepository.destroy({where: {id_width: getPropertyDto.id_width}});
      
      return removeWheelWidths;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
