import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreYear } from '../entities/tyres/tyre-year.model';

@Injectable()
export class PropsTyreYearService {
  constructor(@InjectModel(TyreYear) private tyreYearRepository: typeof TyreYear,
  private tyresService: TyresService) {}

  async createTyreYear(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreYear = await this.tyreYearRepository.findOne(
        { where: { manufacture_year: createPropertyDto.manufacture_year } })

        if(tyreId && tyreYear) {

            const updateYear = await this.tyreYearRepository.update({
             manufacture_year: createPropertyDto.manufacture_year}, {where: {id_year: tyreYear.id_year}});
            await tyreId.$set('year', updateYear);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateYear;

        } else if(tyreId && !tyreYear) {

            const newTyreYear = await this.tyreYearRepository.create(createPropertyDto);

            await tyreId.$set('year', newTyreYear);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreYear;

        } else {

            const tyreYear = await this.tyreYearRepository.create(createPropertyDto);

            return tyreYear;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreYearFromPrice( id: number, manufacture_year: number) {

    try {

        //const tyreId = await this.tyresService.findTyresByIdPrice(id);
        const [tyreYear, created] = await this.tyreYearRepository.findOrCreate(
        { where: {manufacture_year: manufacture_year}, 
          defaults: {manufacture_year: manufacture_year}});
        
        if(created || !created) {

          await tyreYear.$set('tyres', id);

        }

        // if(tyreId && tyreYear) {

        //     const updateYear = await this.tyreYearRepository.update({
        //      manufacture_year: manufacture_year}, {where: {id_year: tyreYear.id_year}});
        //     //await tyreId.$set('year', updateYear);
        //     //tyreId.country = tyreCountry;
        //     //updateCountry.reload();

        //     return updateYear;

        // } else {

        //     const newTyreYear = await this.tyreYearRepository.create({manufacture_year});

        //     //await tyreId.$set('year', newTyreYear.id_year);
        //     //tyreId.country = tyreCountry;
        //     //tyreCountry.reload();

        //     return newTyreYear;

        // } 
        // else {

        //     const tyreYear = await this.tyreYearRepository.create({manufacture_year});

        //     return tyreYear;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreYear() {

    try {

      const tyreAllYear = await this.tyreYearRepository.findAll({include: {all: true}});

      return tyreAllYear;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreYearById(getPropertyDto: GetPropertyDto) {
    try {
      const yearId = await this.tyreYearRepository.findByPk(getPropertyDto.id_year, {include: {all: true}});

      return yearId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreYear( updatePropertyDto: UpdatePropertyDto) {

    try {

      const yearTyresId = await this.tyreYearRepository.findByPk(updatePropertyDto.id_year, {include: {all: true}});

      if(yearTyresId) {

        const updateYear = await this.tyreYearRepository.update(
        { manufacture_year: updatePropertyDto.manufacture_year}, {where: {id_year: updatePropertyDto.id_year}});

        return updateYear; 

      }

      return new HttpException(`Data "id_year" or "year" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreYear(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreYears = await this.tyreYearRepository.destroy({where: {id_year : getPropertyDto.id_year}});
      
      return removeTyreYears;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
