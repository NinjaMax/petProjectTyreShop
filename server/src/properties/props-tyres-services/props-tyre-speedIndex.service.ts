import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSpeedIndex } from '../entities/tyres/tyre-speedIndex.model';

@Injectable()
export class PropsTyreSpeedIndexService {
  constructor(@InjectModel(TyreSpeedIndex) private tyreSpeedIndexRepository: typeof TyreSpeedIndex,
  private tyresService: TyresService) {}

  async createTyreSpeedIndex(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreSpeedIndex = await this.tyreSpeedIndexRepository.findOne(
        { where: { speed_index: createPropertyDto.speed_index } })

        if(tyreId && tyreSpeedIndex) {

            const updateSpeedIndex = await this.tyreSpeedIndexRepository.update({
             speed_index: createPropertyDto.speed_index,
             speed_index_with_desc: createPropertyDto.speed_index_with_desc
            }, {where: {id_speed_index: tyreSpeedIndex.id_speed_index}});
            await tyreId.$set('speed_index', updateSpeedIndex);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSpeedIndex;

        } else if(tyreId && !tyreSpeedIndex) {

            const newTyreSpeedIndex = await this.tyreSpeedIndexRepository.create(createPropertyDto);

            await tyreId.$set('speed_index', newTyreSpeedIndex);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSpeedIndex;

        } else {

            const tyreSpeedIndex = await this.tyreSpeedIndexRepository.create(createPropertyDto);

            return tyreSpeedIndex;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreSpeedIndexFromPrice( id: number,
    speed_index: string, speed_index_with_desc: string) {

    try {

      const [tyreSpeedIndex, created] = await this.tyreSpeedIndexRepository.findOrCreate(
        {where: {speed_index: speed_index}, 
          defaults: {
            speed_index: speed_index, 
            speed_index_with_desc: speed_index_with_desc}
      });

      if(created || !created) {

        await tyreSpeedIndex.$add('tyres', id); 

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreSpeedIndex() {

    try {

      const tyreAllSpeedIndex = await this.tyreSpeedIndexRepository.findAll({include: {all: true}});

      return tyreAllSpeedIndex;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreSpeedIndexById(getPropertyDto: GetPropertyDto) {
    try {
      const speedIndexId = await this.tyreSpeedIndexRepository.findByPk(getPropertyDto.id_speed_index, {include: {all: true}});

      return speedIndexId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreSpeedIndex( updatePropertyDto: UpdatePropertyDto) {

    try {

      const speedIndexTyresId = await this.tyreSpeedIndexRepository.findByPk(updatePropertyDto.id_speed_index, {include: {all: true}});

      if(speedIndexTyresId) {

        const updateSpeedIndex = await this.tyreSpeedIndexRepository.update(
        { speed_index: updatePropertyDto.speed_index,
            speed_index_with_desc: updatePropertyDto.speed_index_with_desc
        }, {where: {id_speed_index: updatePropertyDto.id_speed_index}});

        return updateSpeedIndex; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreSpeedIndex(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreSpeedIndexes = await this.tyreSpeedIndexRepository.destroy({where: {id_speed_index: getPropertyDto.id_speed_index}});
      
      return removeTyreSpeedIndexes;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
