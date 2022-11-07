import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
import { Paynment } from './entities/paynment.model';

@Injectable()
export class PaynmentService {

  constructor(@InjectModel(Paynment) private paynmentRepository: typeof Paynment,
  ) {}

  async createPaynment(createPaynmentDto: CreatePaynmentDto) {
    
    try {

      const paynment = await this.paynmentRepository.create(createPaynmentDto);

      return paynment;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async findAllPaynment() {

    try {

      const paynmentAll = await this.paynmentRepository.findAll({include: {all: true}});

      return paynmentAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async findPaynmentById(getPaynmentDto: GetPaynmentDto) {

    try {

      const paynmentById = await this.paynmentRepository.findByPk(getPaynmentDto.id_paynment, {include: {all: true}});

      return paynmentById;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updatePaynmentDto: UpdatePaynmentDto) {
    return `This action updates a #${id} paynment`;
  }

  async removePaynment(getPaynmentDto: GetPaynmentDto) {

    try {

      const paynmentRemove = await this.paynmentRepository.destroy({where: {id_paynment: getPaynmentDto.id_paynment}});

      return paynmentRemove;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }
}
