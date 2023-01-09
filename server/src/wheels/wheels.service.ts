import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';
import { Wheel } from './entities/wheel.model';

@Injectable()
export class WheelsService {

  constructor(@InjectModel(Wheel) private wheelRepository: typeof Wheel,
  ) {}

  async createWheel(createWheelDto: CreateWheelDto) {

    try {
      
      const wheel = await this.wheelRepository.create(createWheelDto);

      return wheel;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async createWheelFromPrice(
    id: number, 
    full_name : string,
    full_name_color: string,
    full_name_hotline: string,
    update_date : Date, 
    id_brand: number, 
    id_model: number) {

    try {

      const wheelIdFromPrice = await this.wheelRepository.findByPk(id, {include: {all: true}});
      
      if(wheelIdFromPrice) {

        await this.wheelRepository.update(
          { id: id, 
            full_name : full_name,
            full_name_color: full_name_color,
            full_name_hotline: full_name_hotline,
            update_date : update_date,
            id_brand: id_brand,
            id_model: id_model
          }, {where: {id : id}});

        wheelIdFromPrice.save();

        return wheelIdFromPrice;

      } else {

        const tyresFromPrice = await this.wheelRepository.create(
        {id, full_name, full_name_color, full_name_hotline,
           update_date, id_brand, id_model});

        return tyresFromPrice;

      } 

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllWheels() {

    try {
      
      const wheelsAll = await this.wheelRepository.findAll({include: {all: true}});

      return wheelsAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findWheelById(getWheelDto: GetWheelDto) {

    try {
      
      const wheelById = await this.wheelRepository.findByPk(getWheelDto.id, {include: {all: true}});

      return wheelById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findWheelByIdPrice(id: number) {

    try {
      
      const wheelById = await this.wheelRepository.findByPk(id, {include: {all: true}});

      return wheelById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateWheelDto: UpdateWheelDto) {
    return `This action updates a #${id} wheel`;
  }

  async removeWheel(getWheelDto: GetWheelDto) {

    try {
      
      const wheelRemove = await this.wheelRepository.destroy({where: {id: getWheelDto.id}});

      return wheelRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
