import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelPcd } from '../entities/wheels/wheel-pcd.model';

@Injectable()
export class PropsWheelPcdService {
  constructor(@InjectModel(WheelPcd) private wheelPcdRepository: typeof WheelPcd,
  private wheelsService: WheelsService) {}

  async createWheelPcd(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelPcd = await this.wheelPcdRepository.findOne(
        { where: { pcd: createPropertyDto.pcd } })

        if(wheelId && wheelPcd) {

            const updatePcd = await this.wheelPcdRepository.update({
             pcd: createPropertyDto.pcd}, {where: {id_pcd: wheelPcd.id_pcd}});
            await wheelId.$set('pcd', updatePcd);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updatePcd;

        } else if(wheelId && !wheelPcd) {

            const newWheelPcd = await this.wheelPcdRepository.create(createPropertyDto);

            await wheelId.$set('pcd', newWheelPcd);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelPcd;

        } else {

            const wheelPcd = await this.wheelPcdRepository.create(createPropertyDto);

            return wheelPcd;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelPcdFromPrice(id: number, pcd: string) {

    try {

      const [wheelPcd, created] = await this.wheelPcdRepository.findOrCreate(
        {where: {pcd: pcd}, defaults: {pcd: pcd}}
      );

      if(created || !created) {

       await wheelPcd.$add('wheels', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelPcd() {

    try {

      const wheelAllPcd = await this.wheelPcdRepository.findAll({include: {all: true}});

      return wheelAllPcd;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelPcdById(getPropertyDto: GetPropertyDto) {
    try {
      const pcdId = await this.wheelPcdRepository.findByPk(getPropertyDto.id_pcd, {include: {all: true}});

      return pcdId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelPcd( updatePropertyDto: UpdatePropertyDto) {

    try {

      const pcdWheelId = await this.wheelPcdRepository.findByPk(updatePropertyDto.id_pcd, {include: {all: true}});

      if(pcdWheelId) {

        const updatePcd = await this.wheelPcdRepository.update(
        { pcd: updatePropertyDto.pcd}, {where: {id_pcd: updatePropertyDto.id_pcd}});

        return updatePcd; 

      }

      return new HttpException(`Data "id_color" or "color" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelPcd(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelPcds = await this.wheelPcdRepository.destroy({where: {id_pcd: getPropertyDto.id_pcd}});
      
      return removeWheelPcds;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
