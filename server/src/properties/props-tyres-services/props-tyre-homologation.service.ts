import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreHomologation } from '../entities/tyres/tyre-homologation.model';

@Injectable()
export class PropsTyreHomologationService {
  constructor(@InjectModel(TyreHomologation) private tyreHomologationRepository: typeof TyreHomologation,
  private tyresService: TyresService) {}

  async createTyreHomologation(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreHomologation = await this.tyreHomologationRepository.findOne(
        { where: { homologation: createPropertyDto.homologation } })

        if(tyreId && tyreHomologation) {

            const updateHomologation = await this.tyreHomologationRepository.update({
             homologation: createPropertyDto.homologation}, {where: {id_homologation: tyreHomologation.id_homologation}});
            await tyreId.$set('homologation', updateHomologation);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateHomologation;

        } else if(tyreId && !tyreHomologation) {

            const newTyreHomologation = await this.tyreHomologationRepository.create(createPropertyDto);

            await tyreId.$set('homologation', newTyreHomologation);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreHomologation;

        } else {

            const tyreHomologation = await this.tyreHomologationRepository.create(createPropertyDto);

            return tyreHomologation;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreHomologationFromPrice( id: number, homologation: string) {

    try {

      const [tyreHomologation, created] = await this.tyreHomologationRepository.findOrCreate(
        {where: {homologation: homologation}, 
        defaults: {homologation: homologation}}
      );

      if(created || !created) {

        await tyreHomologation.$add('tyres', id);
          
      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreHomologation() {

    try {

      const tyreAllHomologation = await this.tyreHomologationRepository.findAll({include: {all: true}});

      return tyreAllHomologation;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreHomologationById(getPropertyDto: GetPropertyDto) {

    try {

      const homologationId = await this.tyreHomologationRepository.findByPk(getPropertyDto.id_homologation, {include: {all: true}});

      return homologationId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreHomologation( updatePropertyDto: UpdatePropertyDto) {

    try {

      const homologationTyresId = await this.tyreHomologationRepository.findByPk(updatePropertyDto.id_homologation, {include: {all: true}});

      if(homologationTyresId) {

        const updateHomologation = await this.tyreHomologationRepository.update(
        { homologation: updatePropertyDto.homologation}, {where: {id_homologation: updatePropertyDto.id_homologation}});

        return updateHomologation; 

      }

      return new HttpException(`Data "id_height" or "height" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreHomologation(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreHomologations = await this.tyreHomologationRepository.destroy({where: {id_homologation: getPropertyDto.id_homologation}});
      
      return removeTyreHomologations;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}