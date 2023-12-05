import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelDia } from '../entities/wheels/wheel-dia.model';

@Injectable()
export class PropsWheelDiaService {
  constructor(@InjectModel(WheelDia) private wheelDiaRepository: typeof WheelDia,
  private wheelsService: WheelsService) {}

  async createWheelBoltCount(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelDia = await this.wheelDiaRepository.findOne(
        { where: { dia: createPropertyDto.dia } })

        if(wheelId && wheelDia) {

            const updateDia = await this.wheelDiaRepository.update({
            dia: createPropertyDto.dia}, {where: {id_dia: wheelDia.id_dia}});
            await wheelId.$set('dia', updateDia);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateDia;

        } else if(wheelId && !wheelDia) {

            const newWheelDia = await this.wheelDiaRepository.create(createPropertyDto);

            await wheelId.$set('dia', newWheelDia);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelDia;

        } else {

            const wheelDia = await this.wheelDiaRepository.create(createPropertyDto);

            return wheelDia;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelDiaFromPrice( id: number, dia: string) {

    try {

      const [wheelDia, created] = await this.wheelDiaRepository.findOrCreate(
        {where: {dia: dia}, defaults: {dia: dia}}
      );

      if(created || !created) {

        await wheelDia.$add('wheels', id);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelDia() {
    try {
      const wheelAllDia = await this.wheelDiaRepository.findAll({include: {all: true}});

      return wheelAllDia;

    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  async findWheelDiaById(getPropertyDto: GetPropertyDto) {
    try {
      const diaId = await this.wheelDiaRepository.findByPk(getPropertyDto.id_dia, {include: {all: true}});

      return diaId;

    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }

  }

  async updateWheelDia( updatePropertyDto: UpdatePropertyDto) {
    try {
      const diaWheelId = await this.wheelDiaRepository.findByPk(updatePropertyDto.id_dia, {include: {all: true}});

      if(diaWheelId) {

        const updateDia = await this.wheelDiaRepository.update(
        { dia: updatePropertyDto.dia}, {where: {id_dia: updatePropertyDto.id_dia}});

        return updateDia; 

      }

      return new HttpException(`Data "id_dia" or "dia" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelDia(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelDias = await this.wheelDiaRepository.destroy({where: {id_dia: getPropertyDto.id_dia}});
      
      return removeWheelDias;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
