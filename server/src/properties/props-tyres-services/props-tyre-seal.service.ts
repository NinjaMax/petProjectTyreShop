import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSeal } from '../entities/tyres/tyre-seal.model';

@Injectable()
export class PropsTyreSealService {
  constructor(@InjectModel(TyreSeal) private tyreSealRepository: typeof TyreSeal,
  private tyresService: TyresService) {}

  async createTyreSeal(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreSeal = await this.tyreSealRepository.findOne(
        { where: { seal: createPropertyDto.seal } })

        if(tyreId && tyreSeal) {

            const updateSeal = await this.tyreSealRepository.update({
             seal: createPropertyDto.seal}, {where: {id_seal: tyreSeal.id_seal}});
            await tyreId.$set('seal', updateSeal);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSeal;

        } else if(tyreId && !tyreSeal) {

            const newTyreSeal = await this.tyreSealRepository.create(createPropertyDto);

            await tyreId.$set('country', newTyreSeal);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSeal;

        } else {

            const tyreSeal = await this.tyreSealRepository.create(createPropertyDto);

            return tyreSeal;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreSealFromPrice( id: number, seal: string) {

    try {

        const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const tyreSeal = await this.tyreSealRepository.findOne(
        { where: { seal: seal } })

        if(tyreId && tyreSeal) {

            const updateSeal = await this.tyreSealRepository.update({
             seal: seal}, {where: {id_seal: tyreSeal.id_seal}});
            await tyreId.$set('seal', updateSeal);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSeal;

        } else if(tyreId && !tyreSeal) {

            const newTyreSeal = await this.tyreSealRepository.create({seal});

            await tyreId.$set('seal', newTyreSeal);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSeal;

        } else {

            const tyreSeal = await this.tyreSealRepository.create({seal});

            return tyreSeal;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreSeal() {

    try {

      const tyreAllSeal = await this.tyreSealRepository.findAll({include: {all: true}});

      return tyreAllSeal;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreSealById(getPropertyDto: GetPropertyDto) {

    try {

      const sealId = await this.tyreSealRepository.findByPk(getPropertyDto.id_seal, {include: {all: true}});

      return sealId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreSeal( updatePropertyDto: UpdatePropertyDto) {

    try {

      const sealTyresId = await this.tyreSealRepository.findByPk(updatePropertyDto.id_seal, {include: {all: true}});

      if(sealTyresId) {

        const updateSeal = await this.tyreSealRepository.update(
        { seal: updatePropertyDto.seal,
        }, {where: {id_seal: updatePropertyDto.id_seal}});

        return updateSeal; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreSeal(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreSeals = await this.tyreSealRepository.destroy({where: {id_seal: getPropertyDto.id_seal}});
      
      return removeTyreSeals;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}