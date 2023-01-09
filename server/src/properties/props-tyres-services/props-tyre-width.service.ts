import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreWidth } from '../entities/tyres/tyre-width.model';

@Injectable()
export class PropsTyreWidthService {
  constructor(@InjectModel(TyreWidth) private tyreCountryRepository: typeof TyreWidth,
  private tyresService: TyresService) {}

  async createTyreWidth(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreWidth = await this.tyreCountryRepository.findOne(
        { where: { width: createPropertyDto.width } })

        if(tyreId && tyreWidth) {

            const updateWidth = await this.tyreCountryRepository.update({
             width: createPropertyDto.width}, {where: {id_width: tyreWidth.id_width}});
            await tyreId.$set('width', updateWidth);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateWidth;

        } else if(tyreId && !tyreWidth) {

            const newTyreWidth = await this.tyreCountryRepository.create(createPropertyDto);

            await tyreId.$set('width', newTyreWidth);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreWidth;

        } else {

            const tyreWidth = await this.tyreCountryRepository.create(createPropertyDto);

            return tyreWidth;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreWidthFromPrice( id: number, width: number) {

    try {

        const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const tyreWidth = await this.tyreCountryRepository.findOne(
        { where: { width: width } })

        if(tyreId && tyreWidth) {

            const updateWidth = await this.tyreCountryRepository.update({
             width: width}, {where: {id_width: tyreWidth.id_width}});
            //await tyreId.$set('width', updateWidth);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateWidth;

        } else {

            const newTyreWidth = await this.tyreCountryRepository.create(
            {width});

            //await tyreId.$set('width', newTyreWidth.id_width);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreWidth;

        } 
        // else {

        //     const tyreWidth = await this.tyreCountryRepository.create({width});

        //     return tyreWidth;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreWidth() {

    try {

      const tyreAllWidth = await this.tyreCountryRepository.findAll({include: {all: true}});

      return tyreAllWidth;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreWidthById(getPropertyDto: GetPropertyDto) {
    try {
      const widthId = await this.tyreCountryRepository.findByPk(getPropertyDto.id_width, {include: {all: true}});

      return widthId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreWidth( updatePropertyDto: UpdatePropertyDto) {

    try {

      const countryTyresId = await this.tyreCountryRepository.findByPk(updatePropertyDto.id_width, {include: {all: true}});

      if(countryTyresId) {

        const updateWidth = await this.tyreCountryRepository.update(
        { width: updatePropertyDto.width}, {where: {id_width: updatePropertyDto.id_width}});

        return updateWidth; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreWidth(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreWidths = await this.tyreCountryRepository.destroy({where: {id_width: getPropertyDto.id_width}});
      
      return removeTyreWidths;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
