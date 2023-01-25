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
    photo_url: string,
    update_date : Date, 
    ) {

    try {

      const [wheelsIdFromPrice, created] = await this.wheelRepository.findOrCreate(
        {where: {id: id}, 
          defaults: {
            id: id,
            full_name: full_name,
            full_name_color: full_name_color,
            full_name_hotline: full_name_hotline, 
            photo_url: photo_url,
            update_date: update_date,
          }});
        
      if(!created) {

        await wheelsIdFromPrice.update(
          {
          full_name: full_name,
          full_name_color: full_name_color,
          full_name_hotline: full_name_hotline, 
          photo_url: photo_url,
          update_date: update_date},
          {where: {id: wheelsIdFromPrice.id}}
        );

        return wheelsIdFromPrice;

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
