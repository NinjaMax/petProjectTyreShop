import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBoltCountPcd } from '../entities/wheels/wheel-boltCountPcd.model';

@Injectable()
export class PropsWheelBoltCountPcdService {
  constructor(@InjectModel(WheelBoltCountPcd) private wheelBoltCountPcdRepository: typeof WheelBoltCountPcd,
  private wheelsService: WheelsService) {}

  async createWheelBoltCountPcd(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelBoltCountPcd = await this.wheelBoltCountPcdRepository.findOne(
        { where: { bolt_count_pcd: createPropertyDto.bolt_count_pcd } })

        if(wheelId && wheelBoltCountPcd) {

            const updateBoltCountPcd = await this.wheelBoltCountPcdRepository.update({
             bolt_count_pcd: createPropertyDto.bolt_count_pcd}, 
             {where: {id_bolt_count_pcd: wheelBoltCountPcd.id_bolt_count_pcd}});
            await wheelId.$set('bolt_count_pcd', updateBoltCountPcd);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateBoltCountPcd;

        } else if(wheelId && !wheelBoltCountPcd) {

            const newWheelBoltCountPcd = await this.wheelBoltCountPcdRepository.create(createPropertyDto);

            await wheelId.$set('bolt_count_pcd', newWheelBoltCountPcd);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelBoltCountPcd;

        } else {

            const wheelBoltCountPcd = await this.wheelBoltCountPcdRepository.create(createPropertyDto);

            return wheelBoltCountPcd;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelBoltCountPcdFromPrice( id: number, bolt_count_pcd: string) {

    try {

        const wheelId = await this.wheelsService.findWheelByIdPrice(id);
        const wheelBoltCountPcd = await this.wheelBoltCountPcdRepository.findOne(
        { where: { bolt_count_pcd: bolt_count_pcd } })

        if(wheelId && wheelBoltCountPcd) {

            const updateBoltCountPcd = await this.wheelBoltCountPcdRepository.update({
             bolt_count_pcd: bolt_count_pcd}, {where: {id_bolt_count_pcd: wheelBoltCountPcd.id_bolt_count_pcd}});
            await wheelId.$set('bolt_count_pcd', updateBoltCountPcd);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateBoltCountPcd;

        } else if(wheelId && !wheelBoltCountPcd) {

            const newWheelBoltCountPcd = await this.wheelBoltCountPcdRepository.create({bolt_count_pcd});

            await wheelId.$set('bolt_count_pcd', newWheelBoltCountPcd);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelBoltCountPcd;

        } else {

            const wheelBoltCountPcd = await this.wheelBoltCountPcdRepository.create({bolt_count_pcd});

            return wheelBoltCountPcd;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelBoltCountPcd() {

    try {

      const wheelAllBoltCountPcd = await this.wheelBoltCountPcdRepository.findAll({include: {all: true}});

      return wheelAllBoltCountPcd;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelBoltCountPcdById(getPropertyDto: GetPropertyDto) {
    try {
      const boltCountPcdId = await this.wheelBoltCountPcdRepository.findByPk(getPropertyDto.id_bolt_count_pcd, {include: {all: true}});

      return boltCountPcdId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelBoltCountPcd( updatePropertyDto: UpdatePropertyDto) {

    try {

      const boltCountPcdWheelId = await this.wheelBoltCountPcdRepository.findByPk(updatePropertyDto.id_bolt_count_pcd, {include: {all: true}});

      if(boltCountPcdWheelId) {

        const updateBoltCountPcd = await this.wheelBoltCountPcdRepository.update(
        { bolt_count_pcd: updatePropertyDto.bolt_count_pcd}, {where: {id_bolt_count_pcd: updatePropertyDto.id_bolt_count_pcd}});

        return updateBoltCountPcd; 

      }

      return new HttpException(`Data "id_bolt_count" or "bolt_count" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelBoltCountPcd(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelBoltCountPcds = await this.wheelBoltCountPcdRepository.destroy({where: {id_bolt_count_pcd: getPropertyDto.id_bolt_count_pcd}});
      
      return removeWheelBoltCountPcds;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
