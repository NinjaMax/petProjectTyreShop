import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSeason } from '../entities/tyres/tyre-season.model';

@Injectable()
export class PropsTyreSeasonService {
  constructor(@InjectModel(TyreSeason) private tyreSeasonRepository: typeof TyreSeason,
  private tyresService: TyresService) {}

  async createTyreCountry(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreSeason = await this.tyreSeasonRepository.findOne(
        { where: { season: createPropertyDto.season } })

        if(tyreId && tyreSeason) {

            const updateSeason = await this.tyreSeasonRepository.update({
             season: createPropertyDto.season}, {where: {id_season: tyreSeason.id_season}});
            await tyreId.$set('season', updateSeason);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSeason;

        } else if(tyreId && !tyreSeason) {

            const newTyreSeason = await this.tyreSeasonRepository.create(createPropertyDto);

            await tyreId.$set('season', newTyreSeason);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSeason;

        } else {

            const tyreSeason = await this.tyreSeasonRepository.create(createPropertyDto);

            return tyreSeason;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreSeasonFromPrice( id: number, season: string) {

    try {

        const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const tyreSeason = await this.tyreSeasonRepository.findOne(
        { where: { season: season } })

        if(tyreId && tyreSeason) {

            const updateSeason = await this.tyreSeasonRepository.update({
             season: season}, {where: {id_season: tyreSeason.id_season}});
            await tyreId.$set('season', updateSeason);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateSeason;

        } else if(tyreId && !tyreSeason) {

            const newTyreSeason = await this.tyreSeasonRepository.create({season});

            await tyreId.$set('season', newTyreSeason);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreSeason;

        } else {

            const tyreSeason = await this.tyreSeasonRepository.create({season});

            return tyreSeason;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreSeason() {

    try {

      const tyreAllSeason = await this.tyreSeasonRepository.findAll({include: {all: true}});

      return tyreAllSeason;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreSeasonById(getPropertyDto: GetPropertyDto) {

    try {

      const seasonId = await this.tyreSeasonRepository.findByPk(getPropertyDto.id_season, {include: {all: true}});

      return seasonId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreSeason( updatePropertyDto: UpdatePropertyDto) {

    try {

      const seasonTyresId = await this.tyreSeasonRepository.findByPk(updatePropertyDto.id_season, {include: {all: true}});

      if(seasonTyresId) {

        const updateSeason = await this.tyreSeasonRepository.update(
        { season: updatePropertyDto.season}, {where: {id_season: updatePropertyDto.id_season}});

        return updateSeason; 

      }

      return new HttpException(`Data "id_season" or "season" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreCountry(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreSeason = await this.tyreSeasonRepository.destroy({where: {id_season : getPropertyDto.id_season}});
      
      return removeTyreSeason;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}