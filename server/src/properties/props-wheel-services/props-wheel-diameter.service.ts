import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelDiameter } from '../entities/wheels/wheel-diameter.model';
@Injectable()
export class PropsWheelDiameterService {
  constructor(@InjectModel(WheelDiameter) private wheelDiameterRepository: typeof WheelDiameter,
  private wheelsService: WheelsService) {}

  async createWheelDiameter(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelDiameter = await this.wheelDiameterRepository.findOne(
        { where: { diameter: createPropertyDto.diameter } })

        if(wheelId && wheelDiameter) {

            const updateDiameter = await this.wheelDiameterRepository.update({
             diameter: createPropertyDto.diameter}, {where: {id_diameter: wheelDiameter.id_diameter}});
            await wheelId.$set('diameter', updateDiameter);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateDiameter;

        } else if(wheelId && !wheelDiameter) {

            const newWheelDiameter = await this.wheelDiameterRepository.create(createPropertyDto);

            await wheelId.$set('diameter', newWheelDiameter);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelDiameter;

        } else {

            const wheelDiameter = await this.wheelDiameterRepository.create(createPropertyDto);

            return wheelDiameter;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelDiameterFromPrice( id: number, diameter: string) {

    try {

        const wheelId = await this.wheelsService.findWheelByIdPrice(id);
        const wheelDiameter = await this.wheelDiameterRepository.findOne(
        { where: { diameter: diameter } })

        if(wheelId && wheelDiameter) {

            const updateDiameter = await this.wheelDiameterRepository.update({
             diameter: diameter}, {where: {id_diameter: wheelDiameter.id_diameter}});
            await wheelId.$set('diameter', updateDiameter);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateDiameter;

        } else if(wheelId && !wheelDiameter) {

            const newWheelDiameter = await this.wheelDiameterRepository.create({diameter});

            await wheelId.$set('diameter', newWheelDiameter);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelDiameter;

        } else {

            const wheelDiameter = await this.wheelDiameterRepository.create({diameter});

            return wheelDiameter;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelDiameter() {

    try {

      const wheelAllDiameter = await this.wheelDiameterRepository.findAll({include: {all: true}});

      return wheelAllDiameter;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelDiameterById(getPropertyDto: GetPropertyDto) {
    try {
      const diameterId = await this.wheelDiameterRepository.findByPk(getPropertyDto.id_diameter, {include: {all: true}});

      return diameterId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelDiameter( updatePropertyDto: UpdatePropertyDto) {

    try {

      const diameterWheelId = await this.wheelDiameterRepository.findByPk(updatePropertyDto.id_color, {include: {all: true}});

      if(diameterWheelId) {

        const updateDiameter = await this.wheelDiameterRepository.update(
        { diameter: updatePropertyDto.diameter}, {where: {id_diameter: updatePropertyDto.id_diameter}});

        return updateDiameter; 

      }

      return new HttpException(`Data "id_diameter" or "diameter" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelDiameter(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelDiameters = await this.wheelDiameterRepository.destroy({where: {id_diameter: getPropertyDto.id_diameter}});
      
      return removeWheelDiameters;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
