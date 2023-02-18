import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreLoadIndex } from '../entities/tyres/tyre-loadIndex.model';

@Injectable()
export class PropsTyreLoadIndexService {
  constructor(@InjectModel(TyreLoadIndex) private tyreLoadIndexRepository: typeof TyreLoadIndex,
  private tyresService: TyresService) {}

  async createTyreLoadIndex(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreLoadIndex = await this.tyreLoadIndexRepository.findOne(
        { where: { load_index: createPropertyDto.load_index } })

        if(tyreId && tyreLoadIndex) {

            const updateLoadIndex = await this.tyreLoadIndexRepository.update({
             load_index: createPropertyDto.load_index, 
             load_index_with_desc: createPropertyDto.load_index_with_desc
            }, {where: {id_load_index: tyreLoadIndex.id_load_index}});
            await tyreId.$set('load_index', updateLoadIndex);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateLoadIndex;

        } else if(tyreId && !tyreLoadIndex) {

            const newTyreLoadIndex = await this.tyreLoadIndexRepository.create(createPropertyDto);

            await tyreId.$set('load_index', newTyreLoadIndex);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreLoadIndex;

        } else {

            const tyreLoadIndex = await this.tyreLoadIndexRepository.create(createPropertyDto);

            return tyreLoadIndex;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createLoadIndexFromPrice( id: number, load_index: string,
    load_index_with_desc: string) {

    try {

      const [tyreLoadIndex, created] = await this.tyreLoadIndexRepository.findOrCreate(
        {where: {load_index: load_index}, 
          defaults: {load_index: load_index, 
            load_index_with_desc: load_index_with_desc
          }
        }
      );
        
      if(created || !created) {

        await tyreLoadIndex.$add('tyres', id);
          
      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreLoadIndex() {

    try {

      const tyreAllLoadIndex = await this.tyreLoadIndexRepository.findAll({include: {all: true}});

      return tyreAllLoadIndex;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreLoadIndexById(getPropertyDto: GetPropertyDto) {

    try {

      const loadIndexId = await this.tyreLoadIndexRepository.findByPk(getPropertyDto.id_load_index, {include: {all: true}});

      return loadIndexId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreLoadIndex( updatePropertyDto: UpdatePropertyDto) {

    try {

      const loadIndexTyresId = await this.tyreLoadIndexRepository.findByPk(updatePropertyDto.id_load_index, {include: {all: true}});

      if(loadIndexTyresId) {

        const updateLoadIndex = await this.tyreLoadIndexRepository.update(
        { load_index: updatePropertyDto.load_index}, {where: {id_load_index: updatePropertyDto.id_load_index}});

        return updateLoadIndex; 

      }

      return new HttpException(`Data "id_load_index" or "load_index" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreLoadIndex(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreLoadIndexes = await this.tyreLoadIndexRepository.destroy({where: {id_load_index: getPropertyDto.id_load_index}});
      
      return removeTyreLoadIndexes;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}