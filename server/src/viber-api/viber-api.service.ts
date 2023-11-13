import { Injectable } from '@nestjs/common';
import { CreateViberApiDto } from './dto/create-viber-api.dto';
import { UpdateViberApiDto } from './dto/update-viber-api.dto';

@Injectable()
export class ViberApiService {
  create(createViberApiDto: CreateViberApiDto) {
    return 'This action adds a new viberApi';
  }

  findAll() {
    return `This action returns all viberApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viberApi`;
  }

  update(id: number, updateViberApiDto: UpdateViberApiDto) {
    return `This action updates a #${id} viberApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} viberApi`;
  }
}
