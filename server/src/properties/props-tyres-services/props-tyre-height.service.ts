import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreHeight } from '../entities/tyres/tyre-height.model';

@Injectable()
export class PropsTyreHeightService {
  constructor(@InjectModel(TyreHeight) private tyreHeightRepository: typeof TyreHeight,
  private tyresService: TyresService) {}

  async createTyreHeight(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreHeight = await this.tyreHeightRepository.findOne(
        { where: { height: createPropertyDto.height } })

        if(tyreId && tyreHeight) {

            const updateHeight = await this.tyreHeightRepository.update({
             height: createPropertyDto.height}, {where: {id_height: tyreHeight.id_height}});
            await tyreId.$set('height', updateHeight);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateHeight;

        } else if(tyreId && !tyreHeight) {

            const newTyreHeight = await this.tyreHeightRepository.create(createPropertyDto);

            await tyreId.$set('height', newTyreHeight);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreHeight;

        } else {

            const tyreHeight = await this.tyreHeightRepository.create(createPropertyDto);

            return tyreHeight;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreHeightFromPrice( id: number, height: number) {

    try {

        const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const tyreHeight = await this.tyreHeightRepository.findOne(
        { where: { height: height } })

        if(tyreId && tyreHeight) {

            const updateHeight = await this.tyreHeightRepository.update({
             height: height}, {where: {id_height: tyreHeight.id_height}});
            //await tyreId.$set('height', updateHeight);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateHeight;

        } else {

            const newTyreHeight = await this.tyreHeightRepository.create({height});

            //await tyreId.$set('height', newTyreHeight.id_height);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreHeight;

        } 
        // else {

        //     const tyreHeight = await this.tyreHeightRepository.create({height});

        //     return tyreHeight;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreHeight() {

    try {

      const tyreAllHeight = await this.tyreHeightRepository.findAll({include: {all: true}});

      return tyreAllHeight;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreHeightById(getPropertyDto: GetPropertyDto) {

    try {

      const brandId = await this.tyreHeightRepository.findByPk(getPropertyDto.id_height, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreHeight( updatePropertyDto: UpdatePropertyDto) {

    try {

      const heightTyresId = await this.tyreHeightRepository.findByPk(updatePropertyDto.id_height, {include: {all: true}});

      if(heightTyresId) {

        const updateHeight = await this.tyreHeightRepository.update(
        { height: updatePropertyDto.height}, {where: {id_height : updatePropertyDto.id_height}});

        return updateHeight; 

      }

      return new HttpException(`Data "id_height" or "height" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreHeight(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreHeights = await this.tyreHeightRepository.destroy({where: {id_height : getPropertyDto.id_height}});
      
      return removeTyreHeights;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}