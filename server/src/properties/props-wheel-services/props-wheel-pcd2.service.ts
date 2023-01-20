import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelPcd2 } from '../entities/wheels/wheel-pcd2.model';

@Injectable()
export class PropsWheelPcd2Service {
  constructor(@InjectModel(WheelPcd2) private wheelPcd2Repository: typeof WheelPcd2,
  private wheelsService: WheelsService) {}

  async createWheelPcd2(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelPcd2 = await this.wheelPcd2Repository.findOne(
        { where: { pcd2: createPropertyDto.pcd2 } })

        if(wheelId && wheelPcd2) {

            const updatePcd2 = await this.wheelPcd2Repository.update({
             pcd2: createPropertyDto.pcd2}, {where: {id_pcd2: wheelPcd2.id_pcd2}});
            await wheelId.$set('pcd2', updatePcd2);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updatePcd2;

        } else if(wheelId && !wheelPcd2) {

            const newWheelPcd2 = await this.wheelPcd2Repository.create(createPropertyDto);

            await wheelId.$set('pcd2', newWheelPcd2);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelPcd2;

        } else {

            const wheelPcd2 = await this.wheelPcd2Repository.create(createPropertyDto);

            return wheelPcd2;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelPcd2FromPrice( id: number, pcd2: string) {

    try {

        const wheelId = await this.wheelsService.findWheelByIdPrice(id);
        const wheelPcd2 = await this.wheelPcd2Repository.findOne(
        { where: { pcd2: pcd2 } })

        if(wheelId && wheelPcd2) {

            const updatePcd2 = await this.wheelPcd2Repository.update({
             pcd2: pcd2}, {where: {id_pcd2: wheelPcd2.id_pcd2}});
            await wheelId.$set('pcd2', updatePcd2);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updatePcd2;

        } else if(wheelId && !wheelPcd2) {

            const newWheelPcd2 = await this.wheelPcd2Repository.create({pcd2});

            await wheelId.$set('pcd2', newWheelPcd2);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelPcd2;

        } else {

            const wheelPcd2 = await this.wheelPcd2Repository.create({pcd2});

            return wheelPcd2;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelPcd2() {

    try {

      const wheelAllPcd2 = await this.wheelPcd2Repository.findAll({include: {all: true}});

      return wheelAllPcd2;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelPcd2ById(getPropertyDto: GetPropertyDto) {
    try {
      const pcd2Id = await this.wheelPcd2Repository.findByPk(getPropertyDto.id_pcd2, {include: {all: true}});

      return pcd2Id;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelPcd2( updatePropertyDto: UpdatePropertyDto) {

    try {

      const pcd2WheelId = await this.wheelPcd2Repository.findByPk(updatePropertyDto.id_pcd2, {include: {all: true}});

      if(pcd2WheelId) {

        const updatePcd2 = await this.wheelPcd2Repository.update(
        { pcd2: updatePropertyDto.pcd2}, {where: {id_pcd2: updatePropertyDto.id_pcd2}});

        return updatePcd2; 

      }

      return new HttpException(`Data "id_pcd2" or "pcd2" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelPcd2(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelPcd2s = await this.wheelPcd2Repository.destroy({where: {id_pcd2: getPropertyDto.id_pcd2}});
      
      return removeWheelPcd2s;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
