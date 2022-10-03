import { Injectable } from '@nestjs/common';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';

@Injectable()
export class WheelsService {
  create(createWheelDto: CreateWheelDto) {
    return 'This action adds a new wheel';
  }

  findAll() {
    return `This action returns all wheels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wheel`;
  }

  update(id: number, updateWheelDto: UpdateWheelDto) {
    return `This action updates a #${id} wheel`;
  }

  remove(id: number) {
    return `This action removes a #${id} wheel`;
  }
}
