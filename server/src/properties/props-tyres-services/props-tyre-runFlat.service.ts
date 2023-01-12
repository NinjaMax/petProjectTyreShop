import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreRunFlat } from '../entities/tyres/tyre-runFlat.model';

@Injectable()
export class PropsTyreRunFlatService {
  constructor(@InjectModel(TyreRunFlat) private tyreRunFlatRepository: typeof TyreRunFlat,
  private tyresService: TyresService) {}

  async createTyreRunFlat(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreRunFlat = await this.tyreRunFlatRepository.findOne(
        { where: { run_flat: createPropertyDto.run_flat } })

        if(tyreId && tyreRunFlat) {

            const updateRunFlat = await this.tyreRunFlatRepository.update({
             run_flat: createPropertyDto.run_flat}, {where: {id_run_flat: tyreRunFlat.id_run_flat}});
            await tyreId.$set('run_flat', updateRunFlat);

            return updateRunFlat;

        } else if(tyreId && !tyreRunFlat) {

            const newTyreRunFlat = await this.tyreRunFlatRepository.create(createPropertyDto);

            await tyreId.$set('country', newTyreRunFlat);

            return newTyreRunFlat;

        } else {

            const tyreRunFlat = await this.tyreRunFlatRepository.create(createPropertyDto);

            return tyreRunFlat;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreRunFlatFromPrice( id: number, run_flat: string) {

    try {

      const [tyreRunFlat, created] = await this.tyreRunFlatRepository.findOrCreate(
        {where: {run_flat: run_flat}, defaults: {run_flat: run_flat}}
      );

      if(created || !created) {

        await tyreRunFlat.$add('tyres', id);
          
      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreRunFlat() {

    try {

      const tyreAllRunFlat = await this.tyreRunFlatRepository.findAll({include: {all: true}});

      return tyreAllRunFlat;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreRunFlatById(getPropertyDto: GetPropertyDto) {

    try {

      const runFlatId = await this.tyreRunFlatRepository.findByPk(getPropertyDto.id_run_flat, {include: {all: true}});

      return runFlatId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreRunFlat( updatePropertyDto: UpdatePropertyDto) {

    try {

      const runFlatTyresId = await this.tyreRunFlatRepository.findByPk(updatePropertyDto.id_run_flat, {include: {all: true}});

      if(runFlatTyresId) {

        const updateRunFlat = await this.tyreRunFlatRepository.update(
        { run_flat: updatePropertyDto.run_flat}, {where: {id_run_flat: updatePropertyDto.id_run_flat}});

        return updateRunFlat; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreRunFlat(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreRunFlats = await this.tyreRunFlatRepository.destroy({where: {id_run_flat: getPropertyDto.id_run_flat}});
      
      return removeTyreRunFlats;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}