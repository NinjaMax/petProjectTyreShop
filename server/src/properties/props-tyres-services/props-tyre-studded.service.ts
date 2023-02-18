import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreStudded } from '../entities/tyres/tyre-studded.model';

@Injectable()
export class PropsTyreStuddedService {
  constructor(@InjectModel(TyreStudded) private tyreStuddedRepository: typeof TyreStudded,
  private tyresService: TyresService) {}

  async createTyreStudded(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreStudded = await this.tyreStuddedRepository.findOne(
        { where: { studded: createPropertyDto.studded } })

        if(tyreId && tyreStudded) {

            const updateStudded = await this.tyreStuddedRepository.update({
             studded: createPropertyDto.studded}, {where: {id_studded: tyreStudded.id_studded}});
            await tyreId.$set('studded', updateStudded);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateStudded;

        } else {

            const newTyreStudded = await this.tyreStuddedRepository.create(createPropertyDto);

            await tyreId.$set('studded', newTyreStudded.id_studded);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreStudded;

        } 
        // else {

        //     const tyreStudded = await this.tyreStuddedRepository.create(createPropertyDto);

        //     return tyreStudded;
        // }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreStuddedFromPrice( id: number, studded: string) {

    try {

      const [tyreStudded, created] = await this.tyreStuddedRepository.findOrCreate(
        {where: {studded: studded}, defaults: {studded: studded}}
      );

      if(created || !created) {

        await tyreStudded.$add('tyres', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreStudded() {

    try {

      const tyreAllStudded = await this.tyreStuddedRepository.findAll({include: {all: true}});

      return tyreAllStudded;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreStuddedById(getPropertyDto: GetPropertyDto) {
    try {
      const studdedId = await this.tyreStuddedRepository.findByPk(getPropertyDto.id_studded, {include: {all: true}});

      return studdedId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreStudded( updatePropertyDto: UpdatePropertyDto) {

    try {

      const studdedTyresId = await this.tyreStuddedRepository.findByPk(updatePropertyDto.id_studded, {include: {all: true}});

      if(studdedTyresId) {

        const updateStudded = await this.tyreStuddedRepository.update(
        { studded: updatePropertyDto.studded}, {where: {id_studded: updatePropertyDto.id_studded}});

        return updateStudded; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreStudded(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreStuddeds = await this.tyreStuddedRepository.destroy({where: {id_studded: getPropertyDto.id_studded}});
      
      return removeTyreStuddeds;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
