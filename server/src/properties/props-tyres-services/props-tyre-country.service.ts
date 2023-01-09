import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreCountry } from '../entities/tyres/tyre-country.model';

@Injectable()
export class PropsTyreCountryService {
  constructor(@InjectModel(TyreCountry) private tyreCountryRepository: typeof TyreCountry,
  private tyresService: TyresService) {}

  async createTyreCountry(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreCountry = await this.tyreCountryRepository.findOne(
        { where: { country_manufacturer: createPropertyDto.country_manufacturer } })

        if(tyreId && tyreCountry) {

            const updateCountry = await this.tyreCountryRepository.update({
             country_manufacturer: createPropertyDto.country_manufacturer,
             country_manufacturer_ua: createPropertyDto.country_manufacturer_ua
            }, {where: {id_country: tyreCountry.id_country}});
            await tyreId.$set('country', updateCountry);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateCountry;

        } else if(tyreId && !tyreCountry) {

            const newTyreCountry = await this.tyreCountryRepository.create(createPropertyDto);

            await tyreId.$set('country', newTyreCountry);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreCountry;

        } else {

            const tyreCountry = await this.tyreCountryRepository.create(createPropertyDto);

            return tyreCountry;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreCountryFromPrice( id: number,
    country_manufacturer: string, country_manufacturer_ua: string) {

    try {

        const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const tyreCountry = await this.tyreCountryRepository.findOne(
        { where: { country_manufacturer: country_manufacturer } })

        if(tyreId && tyreCountry) {

            const updateCountry = await this.tyreCountryRepository.update({
             country_manufacturer: country_manufacturer,
             country_manufacturer_ua: country_manufacturer_ua
            }, {where: {id_country: tyreCountry.id_country}});
            //await tyreId.$set('country', updateCountry);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateCountry;

        } else {

          const newTyreCountry = await this.tyreCountryRepository.create(
            {country_manufacturer, country_manufacturer_ua});

          //await tyreId.$set('country', newTyreCountry.id_country);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

          return newTyreCountry;

        } 
        // else {

        //     const tyreCountry = await this.tyreCountryRepository.create(
        //         {country_manufacturer, country_manufacturer_ua});

        //     return tyreCountry;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreCountry() {

    try {

      const tyreAllCountry = await this.tyreCountryRepository.findAll({include: {all: true}});

      return tyreAllCountry;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreCountryById(getPropertyDto: GetPropertyDto) {
    try {
      const countryId = await this.tyreCountryRepository.findByPk(getPropertyDto.id_country, {include: {all: true}});

      return countryId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreCountry( updatePropertyDto: UpdatePropertyDto) {

    try {

      const countryTyresId = await this.tyreCountryRepository.findByPk(updatePropertyDto.id_country, {include: {all: true}});

      if(countryTyresId) {

        const updateCountry = await this.tyreCountryRepository.update(
        { country_manufacturer: updatePropertyDto.country_manufacturer,
            country_manufacturer_ua: updatePropertyDto.country_manufacturer_ua
        }, {where: {id_country : updatePropertyDto.id_country}});

        return updateCountry; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreCountry(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreCountrys = await this.tyreCountryRepository.destroy({where: {id_country : getPropertyDto.id_country}});
      
      return removeTyreCountrys;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
