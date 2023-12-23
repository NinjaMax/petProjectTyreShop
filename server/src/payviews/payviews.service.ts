import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePayviewDto } from './dto/create-payview.dto';
import { UpdatePayviewDto } from './dto/update-payview.dto';
import { Payview } from './entities/payview.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PayviewsService {
  constructor(
    @InjectModel(Payview) private payviewsRepository: typeof Payview,
  ) {}

  create(createPayviewDto: CreatePayviewDto) {
    return 'This action adds a new payview';
  }

  async findAllPayViews() {
    try {
      const payviewAll = await this.payviewsRepository.findAll();
      return payviewAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payview`;
  }

  update(id: number, updatePayviewDto: UpdatePayviewDto) {
    return `This action updates a #${id} payview`;
  }

  remove(id: number) {
    return `This action removes a #${id} payview`;
  }
}
