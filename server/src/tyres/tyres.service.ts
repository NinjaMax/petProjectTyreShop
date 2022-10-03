import { Injectable } from '@nestjs/common';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';

@Injectable()
export class TyresService {
  create(createTyreDto: CreateTyreDto) {
    return 'This action adds a new tyre';
  }

  findAll() {
    return `This action returns all tyres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tyre`;
  }

  update(id: number, updateTyreDto: UpdateTyreDto) {
    return `This action updates a #${id} tyre`;
  }

  remove(id: number) {
    return `This action removes a #${id} tyre`;
  }
}
