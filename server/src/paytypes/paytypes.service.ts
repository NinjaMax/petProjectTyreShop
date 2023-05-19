import { Injectable } from '@nestjs/common';
import { CreatePaytypeDto } from './dto/create-paytype.dto';
import { UpdatePaytypeDto } from './dto/update-paytype.dto';

@Injectable()
export class PaytypesService {
  create(createPaytypeDto: CreatePaytypeDto) {
    return 'This action adds a new paytype';
  }

  findAll() {
    return `This action returns all paytypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paytype`;
  }

  update(id: number, updatePaytypeDto: UpdatePaytypeDto) {
    return `This action updates a #${id} paytype`;
  }

  remove(id: number) {
    return `This action removes a #${id} paytype`;
  }
}
