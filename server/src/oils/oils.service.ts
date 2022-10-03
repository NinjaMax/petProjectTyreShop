import { Injectable } from '@nestjs/common';
import { CreateOilDto } from './dto/create-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';

@Injectable()
export class OilsService {
  create(createOilDto: CreateOilDto) {
    return 'This action adds a new oil';
  }

  findAll() {
    return `This action returns all oils`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oil`;
  }

  update(id: number, updateOilDto: UpdateOilDto) {
    return `This action updates a #${id} oil`;
  }

  remove(id: number) {
    return `This action removes a #${id} oil`;
  }
}
