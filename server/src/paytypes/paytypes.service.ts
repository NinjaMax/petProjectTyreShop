import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaytypeDto } from './dto/create-paytype.dto';
import { UpdatePaytypeDto } from './dto/update-paytype.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Paytype } from './entities/paytype.entity';

@Injectable()
export class PaytypesService {
  constructor(
    @InjectModel(Paytype) private paytypeRepository: typeof Paytype,
  ) {}

  create(createPaytypeDto: CreatePaytypeDto) {
    return 'This action adds a new paytype';
  }

  async findAllPayTypes() {
    try {
      const payTypesAll = await this.paytypeRepository.findAll();
      return payTypesAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
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
