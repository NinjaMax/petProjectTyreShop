import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelSizeDigits } from '../entities/wheels/wheel-sizeDigits.model';

@Injectable()
export class PropsWheelSizeDigitsService {
  constructor(@InjectModel(WheelSizeDigits) private wheelSizeDigitsRepository: typeof WheelSizeDigits,
  private wheelsService: WheelsService) {}

  async createWheelSizeDigits(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelSizeDigits = await this.wheelSizeDigitsRepository.findOne(
        { where: { size_only_digits: createPropertyDto.size_only_digits } })

        if(wheelId && wheelSizeDigits) {

            const updateSizeDigits = await this.wheelSizeDigitsRepository.update({
             size_only_digits: createPropertyDto.size_only_digits}, 
             {where: {id_size_digits: wheelSizeDigits.id_size_digits}});
            await wheelId.$set('size_digits', updateSizeDigits);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSizeDigits;

        } else if(wheelId && !wheelSizeDigits) {

            const newWheelSizeDigits = await this.wheelSizeDigitsRepository.create(createPropertyDto);

            await wheelId.$set('size_digits', newWheelSizeDigits);

            return newWheelSizeDigits;

        } else {

            const wheelSizeDigits = await this.wheelSizeDigitsRepository.create(createPropertyDto);

            return wheelSizeDigits;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelSizeDigitsFromPrice( id: number, size_only_digits: string) {

    try {

      const [wheelSize_only_digits, created] = await this.wheelSizeDigitsRepository.findOrCreate(
        {where: {size_only_digits: size_only_digits}, 
        defaults: {size_only_digits: size_only_digits}}
      );

      if(created || !created) {

        await wheelSize_only_digits.$add('wheels', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelSizeDigits() {

    try {

      const wheelAllSizeDigits = await this.wheelSizeDigitsRepository.findAll({include: {all: true}});

      return wheelAllSizeDigits;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelSizeDigitsById(getPropertyDto: GetPropertyDto) {
    try {
      const sizeDigitsId = await this.wheelSizeDigitsRepository.findByPk(getPropertyDto.id_size_digits, {include: {all: true}});

      return sizeDigitsId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelSizeDigits( updatePropertyDto: UpdatePropertyDto) {

    try {

      const sizeDigitsWheelId = await this.wheelSizeDigitsRepository.findByPk(
        updatePropertyDto.id_size_digits, {include: {all: true}});

      if(sizeDigitsWheelId) {

        const updateSizeDigits = await this.wheelSizeDigitsRepository.update(
        { size_only_digits: updatePropertyDto.size_only_digits}, 
        {where: {id_size_digits: updatePropertyDto.id_size_digits}});

        return updateSizeDigits; 

      }

      return new HttpException(`Data "id_size_digits" or "size_digits" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelSizeDigits(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelSizeDigitss = await this.wheelSizeDigitsRepository.destroy(
        {where: {id_size_digits: getPropertyDto.id_size_digits}});
      
      return removeWheelSizeDigitss;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
