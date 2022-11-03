import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { GetBatteryDto } from './dto/get-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from './entities/battery.model';

@Injectable()
export class BatteriesService {

  constructor(@InjectModel(Battery) private batteryRepository: typeof Battery,
    ) {}

  async createBattery(createBatteryDto: CreateBatteryDto) {

    try {
      
      const battery = await this.batteryRepository.create(createBatteryDto);

      return battery;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllBatteries() {

    try {
      
      const batteryAll = await this.batteryRepository.findAll({include: {all: true}});

      return batteryAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findBatteryById(getBatteryDto: GetBatteryDto) {

    try {
      
      const batteryById = await this.batteryRepository.findByPk(getBatteryDto.id_battery, {include: {all: true}});

      return batteryById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateBatteryDto: UpdateBatteryDto) {
    return `This action updates a #${id} battery`;
  }

  async removeBattery(getBatteryDto: GetBatteryDto) {

    try {
      
      const batteryRemove = await this.batteryRepository.destroy({where: {id_battery: getBatteryDto.id_battery}});

      return batteryRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
