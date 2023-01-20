import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelEt } from '../entities/wheels/wheel-et.model';

@Injectable()
export class PropsWheelEtService {
  constructor(@InjectModel(WheelEt) private wheelEtRepository: typeof WheelEt,
  private wheelsService: WheelsService) {}

  async createWheelEt(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelEt = await this.wheelEtRepository.findOne(
        { where: { et: createPropertyDto.et } })

        if(wheelId && wheelEt) {

            const updateEt = await this.wheelEtRepository.update({
             et: createPropertyDto.et}, {where: {id_et: wheelEt.id_et}});
            await wheelId.$set('et', updateEt);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateEt;

        } else if(wheelId && !wheelEt) {

            const newWheelEt = await this.wheelEtRepository.create(createPropertyDto);

            await wheelId.$set('et', newWheelEt);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelEt;

        } else {

            const wheelEt = await this.wheelEtRepository.create(createPropertyDto);

            return wheelEt;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelEtFromPrice( id: number, et: string) {

    try {

        const wheelId = await this.wheelsService.findWheelByIdPrice(id);
        const wheelEt = await this.wheelEtRepository.findOne(
        { where: { et: et } })

        if(wheelId && wheelEt) {

            const updateEt = await this.wheelEtRepository.update({
             et: et}, {where: {id_et: wheelEt.id_et}});
            await wheelId.$set('et', updateEt);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateEt;

        } else if(wheelId && !wheelEt) {

            const newWheelEt = await this.wheelEtRepository.create({et});

            await wheelId.$set('et', newWheelEt);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelEt;

        } else {

            const wheelEt = await this.wheelEtRepository.create({et});

            return wheelEt;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelEt() {

    try {

      const wheelAllEt = await this.wheelEtRepository.findAll({include: {all: true}});

      return wheelAllEt;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelEtById(getPropertyDto: GetPropertyDto) {
    try {
      const etId = await this.wheelEtRepository.findByPk(getPropertyDto.id_et, {include: {all: true}});

      return etId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelEt( updatePropertyDto: UpdatePropertyDto) {

    try {

      const etWheelId = await this.wheelEtRepository.findByPk(updatePropertyDto.id_et, {include: {all: true}});

      if(etWheelId) {

        const updateEt = await this.wheelEtRepository.update(
        { et: updatePropertyDto.et}, {where: {id_et: updatePropertyDto.id_et}});

        return updateEt; 

      }

      return new HttpException(`Data "id_et" or "et" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelEt(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelEts = await this.wheelEtRepository.destroy({where: {id_et: getPropertyDto.id_et}});
      
      return removeWheelEts;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
