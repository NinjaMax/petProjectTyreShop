import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelColor } from '../entities/wheels/wheel-color.model';

@Injectable()
export class PropsWheelColorService {
  constructor(@InjectModel(WheelColor) private wheelColorRepository: typeof WheelColor,
  private wheelsService: WheelsService) {}

  async createWheelColor(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelColor = await this.wheelColorRepository.findOne(
        { where: { color: createPropertyDto.color } })

        if(wheelId && wheelColor) {

            const updateColor = await this.wheelColorRepository.update({
             color: createPropertyDto.color, 
             color_short: createPropertyDto.color_short}, {where: {id_color: wheelColor.id_color}});
            await wheelId.$set('color', updateColor);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateColor;

        } else if(wheelId && !wheelColor) {

            const newWheelColor = await this.wheelColorRepository.create(createPropertyDto);

            await wheelId.$set('color', newWheelColor);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelColor;

        } else {

            const wheelColor = await this.wheelColorRepository.create(createPropertyDto);

            return wheelColor;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelColorFromPrice( id: number, id_color: number, color: string, 
    color_short: string) {

    try {

      const [wheelColor, created] = await this.wheelColorRepository.findOrCreate(
        {where: {id_color: id_color}, 
          defaults: {id_color: id_color, 
            color: color, 
            color_short: color_short
          }
        }
      );

      if(created || !created) {

        await wheelColor.$add('wheels', id);

      }


    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelColor() {

    try {

      const wheelAllColor = await this.wheelColorRepository.findAll({include: {all: true}});

      return wheelAllColor;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelColorById(getPropertyDto: GetPropertyDto) {
    try {
      const colorId = await this.wheelColorRepository.findByPk(getPropertyDto.id_color, {include: {all: true}});

      return colorId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelColor( updatePropertyDto: UpdatePropertyDto) {

    try {

      const colorWheelId = await this.wheelColorRepository.findByPk(updatePropertyDto.id_color, {include: {all: true}});

      if(colorWheelId) {

        const updateColor = await this.wheelColorRepository.update(
        { color: updatePropertyDto.color,
          color_short: updatePropertyDto.color_short}, {where: {id_color: updatePropertyDto.id_color}});

        return updateColor; 

      }

      return new HttpException(`Data "id_color" or "color" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelColor(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelColors = await this.wheelColorRepository.destroy({where: {id_color: getPropertyDto.id_color}});
      
      return removeWheelColors;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
