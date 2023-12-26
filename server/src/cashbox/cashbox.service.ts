import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { GetCashboxDto } from './dto/get-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';
import { Cashbox } from './entities/cashbox.model';

@Injectable()
export class CashboxService {
  constructor(
    @InjectModel(Cashbox) private cashboxRepository: typeof Cashbox,
  ) {}

  async createCashbox(createCashboxDto: CreateCashboxDto) {
    try {
      const cashbox = await this.cashboxRepository.create(createCashboxDto);

      return cashbox;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }


  async findAllCashbox() {
    try {
      const cashboxAll = await this.cashboxRepository.findAll({
        //include: { all: true },
      });

      return cashboxAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCashboxById(getCashboxDto: GetCashboxDto) {
    //try {
      const cashboxById = await this.cashboxRepository.findByPk(
        getCashboxDto.id_cashbox,
        { include: { all: true } },
      );

      return cashboxById;
    // } catch (error) {
    //   throw new HttpException(
    //     'Data is incorrect or Not Found',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async updateCashbox(updateCashboxDto: UpdateCashboxDto) {
    try {
      await this.cashboxRepository.update(
        {
          cashbox: updateCashboxDto.cashbox,
          organisation: updateCashboxDto.organisation,
          cashboxType: updateCashboxDto.cashboxType,
          funds: updateCashboxDto.funds,
        },
        { where: { id_cashbox: updateCashboxDto.id_cashbox } },
      );
      const cashboxUpdate = await this.cashboxRepository.findByPk(
        updateCashboxDto.id_cashbox,
      );
      return cashboxUpdate;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeCashbox(getCashboxDto: GetCashboxDto) {
    try {
      const cashboxRemove = await this.cashboxRepository.destroy({
        where: { id_cashbox: getCashboxDto.id_cashbox },
      });

      return cashboxRemove;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
