import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSizeDigits } from '../entities/tyres/tyre-sizeDigits.model';

@Injectable()
export class PropsTyreSizeDigitsService {
  constructor(@InjectModel(TyreSizeDigits) private tyreCountryRepository: typeof TyreSizeDigits,
  private tyresService: TyresService) {}

  async createTyreSizeDigits(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreSizeDigits = await this.tyreCountryRepository.findOne(
        { where: { size_only_digits: createPropertyDto.size_only_digits } })

        if(tyreId && tyreSizeDigits) {

            const updateSizeDigits = await this.tyreCountryRepository.update({
             size_only_digits: createPropertyDto.size_only_digits}, {where: {id_size_digits: tyreSizeDigits.id_size_digits}});
            await tyreId.$set('size_digits', updateSizeDigits);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSizeDigits;

        } else if(tyreId && !tyreSizeDigits) {

            const newTyreSizeDigits = await this.tyreCountryRepository.create(createPropertyDto);

            await tyreId.$set('size_digits', newTyreSizeDigits);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSizeDigits;

        } else {

            const tyreSizeDigits = await this.tyreCountryRepository.create(createPropertyDto);

            return tyreSizeDigits;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreSizeDigitsFromPrice( id: number, size_only_digits: number) {

    try {

      const [tyreSizeDigits, created] = await this.tyreCountryRepository.findOrCreate(
        {where: {size_only_digits: size_only_digits}, 
          defaults: {size_only_digits: size_only_digits}}
      );  
        
      if(created || !created) {
          
        tyreSizeDigits.$add('tyres', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreSizeDigits() {

    try {

      const tyreAllSizeDigits = await this.tyreCountryRepository.findAll({include: {all: true}});

      return tyreAllSizeDigits;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreSizeDigitsyById(getPropertyDto: GetPropertyDto) {
    try {
      const sizeDigitsId = await this.tyreCountryRepository.findByPk(getPropertyDto.id_size_digits, {include: {all: true}});

      return sizeDigitsId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreSizeDigits( updatePropertyDto: UpdatePropertyDto) {

    try {

      const sizeDigitsTyresId = await this.tyreCountryRepository.findByPk(updatePropertyDto.id_size_digits, {include: {all: true}});

      if(sizeDigitsTyresId) {

        const updateSizeDigits = await this.tyreCountryRepository.update(
        { size_only_digits: updatePropertyDto.size_only_digits}, {where: {id_size_digits : updatePropertyDto.id_size_digits}});

        return updateSizeDigits; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreSizeDigits(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreSizeDigit = await this.tyreCountryRepository.destroy({where: {id_size_digits : getPropertyDto.id_size_digits}});
      
      return removeTyreSizeDigit;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
