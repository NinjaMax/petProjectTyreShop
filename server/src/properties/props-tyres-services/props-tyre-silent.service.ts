import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSilent } from '../entities/tyres/tyre-silent.model';

@Injectable()
export class PropsTyreSilentService {
  constructor(@InjectModel(TyreSilent) private tyreSilentRepository: typeof TyreSilent,
  private tyresService: TyresService) {}

  async createTyreSilent(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreSilent = await this.tyreSilentRepository.findOne(
        { where: { silent: createPropertyDto.silent } })

        if(tyreId && tyreSilent) {

            const updateSilent = await this.tyreSilentRepository.update({
             silent: createPropertyDto.silent}, {where: {id_silent: tyreSilent.id_silent}});
            await tyreId.$set('silent', updateSilent);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSilent;

        } else if(tyreId && !tyreSilent) {

            const newTyreSilent = await this.tyreSilentRepository.create(createPropertyDto);

            await tyreId.$set('silent', newTyreSilent);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSilent;

        } else {

            const tyreSilent = await this.tyreSilentRepository.create(createPropertyDto);

            return tyreSilent;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreSilentFromPrice( id: number, silent: string) {

    try {

      //const tyreId = await this.tyresService.findTyresByIdPrice(id);
      const [tyreSilent, created] = await this.tyreSilentRepository.findOrCreate(
      { where: { silent: silent}, defaults: {silent: silent}});

      if(created || !created) {

        await tyreSilent.$set('tyres', id);
        
      }

      // if(tyreId && tyreSilent) {

      //   const updateSilent = await this.tyreSilentRepository.update({
      //     silent: silent}, {where: {id_silent: tyreSilent.id_silent}});
      //   //await tyreId.$set('silent', updateSilent);
      //       //tyreId.country = tyreCountry;
      //       //updateCountry.reload();

      //   return updateSilent;

      // } else {

      //   const newTyreSilent = await this.tyreSilentRepository.create({silent});

      //   //await tyreId.$set('silent', newTyreSilent.id_silent);
      //       //tyreId.country = tyreCountry;
      //       //tyreCountry.reload();

      //   return newTyreSilent;

      // } 
        // else {

        //     const tyreSilent = await this.tyreSilentRepository.create({silent});

        //     return tyreSilent;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreCountry() {

    try {

      const tyreAllCountry = await this.tyreSilentRepository.findAll({include: {all: true}});

      return tyreAllCountry;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreCountryById(getPropertyDto: GetPropertyDto) {
    try {
      const CountryId = await this.tyreSilentRepository.findByPk(getPropertyDto.id_country, {include: {all: true}});

      return CountryId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreCountry( updatePropertyDto: UpdatePropertyDto) {

    try {

      const silentTyresId = await this.tyreSilentRepository.findByPk(updatePropertyDto.id_silent, {include: {all: true}});

      if(silentTyresId) {

        const updateSilent = await this.tyreSilentRepository.update(
        { silent: updatePropertyDto.silent}, {where: {id_silent: updatePropertyDto.id_silent}});

        return updateSilent; 

      }

      return new HttpException(`Data "id_silent" or "silent" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreSilent(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreSilents = await this.tyreSilentRepository.destroy({where: {id_silent : getPropertyDto.id_silent}});
      
      return removeTyreSilents;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
