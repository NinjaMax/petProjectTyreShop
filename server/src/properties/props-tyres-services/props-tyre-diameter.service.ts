import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreDiameter } from '../entities/tyres/tyre-diameter.model';

@Injectable()
export class PropsTyrDiametrService {
  constructor(@InjectModel(TyreDiameter) private tyreDiameterRepository: typeof TyreDiameter,
  private tyresService: TyresService) {}

  async createTyreDiameter(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreDiameter = await this.tyreDiameterRepository.findOne(
        { where: { diameter: createPropertyDto.diameter } })

        if(tyreId && tyreDiameter) {

            const updateDiameter = await this.tyreDiameterRepository.update({
             diameter: createPropertyDto.diameter}, {where: {id_diameter: tyreDiameter.id_diameter}});
            await tyreId.$set('diameter', updateDiameter);

            return updateDiameter;

        } else if(tyreId && !tyreDiameter) {

            const newTyreDiameter = await this.tyreDiameterRepository.create(createPropertyDto);

            await tyreId.$set('diameter', newTyreDiameter);

            return newTyreDiameter;

        } else {

            const tyreCountry = await this.tyreDiameterRepository.create(createPropertyDto);

            return tyreCountry;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreDiameterFromPrice( id: number, diameter: number) {

    try {

      const [tyreDiameter, created] = await this.tyreDiameterRepository.findOrCreate(
        {where: {diameter: diameter}, defaults: {diameter: +diameter}}
      );

      if(created || !created) {

        await tyreDiameter.$add('tyres', id);
          
      }
    
    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreDiameter() {

    try {

      const tyreAllDiameter = await this.tyreDiameterRepository.findAll({include: {all: true}});

      return tyreAllDiameter;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreDiameterById(getPropertyDto: GetPropertyDto) {

    try {

      const brandId = await this.tyreDiameterRepository.findByPk(getPropertyDto.id_diameter, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreDiameter( updatePropertyDto: UpdatePropertyDto) {

    try {

      const countryTyresId = await this.tyreDiameterRepository.findByPk(updatePropertyDto.id_diameter, {include: {all: true}});

      if(countryTyresId) {

        const updateDiameter = await this.tyreDiameterRepository.update(
        { diameter: updatePropertyDto.diameter}, {where: {id_diameter: updatePropertyDto.id_diameter}});

        return updateDiameter; 

      }

      return new HttpException(`Data "id_diameter" or "diameter" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreDiameter(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreDiameters = await this.tyreDiameterRepository.destroy({where: {id_diameter: getPropertyDto.id_diameter}});
      
      return removeTyreDiameters;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}