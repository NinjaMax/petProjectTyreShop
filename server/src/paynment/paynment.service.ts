import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
import { Paynment } from './entities/paynment.model';
import { CashboxService } from '../cashbox/cashbox.service';
import { ContractService } from '../contract/contract.service';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaynmentService {
  constructor(
    @InjectModel(Paynment) private paynmentRepository: typeof Paynment,
    private orderService: OrdersService,
    private ordersSupService: OrdersSuppliersService,
    private cashboxService: CashboxService,
    private contractService: ContractService,
  ) {}

  async createPaynment(createPaynmentDto: CreatePaynmentDto) {
    try {
      const order = await this.orderService.findOrderById(createPaynmentDto);
      const orderSup = await this.ordersSupService.findOrderSupById(
        createPaynmentDto,
      );
      const cashBox = await this.cashboxService.findCashboxById(
        createPaynmentDto,
      );

      const contract = await this.contractService.findContractById(
        createPaynmentDto,
      );
      const paynment = await this.paynmentRepository.create(createPaynmentDto);

      if (createPaynmentDto.id_paytype === 2) {
        const paynmentIdExp = await this.paynmentRepository.findByPk(
          paynment.id_paynment,
        );

        if (order) {
          await order.$add('paynment', paynmentIdExp.id_paynment);
          order.paynment.push(paynmentIdExp);
        }

        if (orderSup) {
          await orderSup.$add('paynment', paynmentIdExp.id_paynment);
          orderSup.paynment.push(paynmentIdExp);
        }

        //await expense.$add('paynment', paynmentIdExp.id_paynment);
        if (contract) {
          await contract.decrement('balance', { by: paynmentIdExp.price });
          await contract.reload();
        }
      
        await cashBox.decrement('funds', { by: paynmentIdExp.price });
        await cashBox.reload();

        return paynmentIdExp;
      }

      if (createPaynmentDto.id_paytype === 1) {
        const paynmentIdInc = await this.paynmentRepository.findByPk(
          paynment.id_paynment,
        );

        if (order) {
          await order.$add('paynment', paynmentIdInc.id_paynment);
          order.paynment.push(paynmentIdInc);
        }

        if (orderSup) {
          await orderSup.$add('paynment', paynmentIdInc.id_paynment);
          orderSup.paynment.push(paynmentIdInc);
        }

        //await income.$add('paynment', paynmentIdInc.id_paynment);
        //income.paynment.push(paynmentIdInc);
        if (contract) {
          await contract.increment('balance', { by: paynmentIdInc.price });
          await contract.reload();
        }
        
        await cashBox.increment('funds', { by: paynmentIdInc.price });
        await cashBox.reload();

        return paynmentIdInc;
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllPaynment() {
    try {
      const paynmentAll = await this.paynmentRepository.findAll({
        include: { all: true },
      });

      return paynmentAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllIncomesPaynments() {
    try {
      const paynmentAll = await this.paynmentRepository.findAll({
        where: { id_paytype: 1 },
        include: { all: true },
      });

      return paynmentAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllExpensesPaynments() {
    try {
      const paynmentAll = await this.paynmentRepository.findAll({
        where: { id_paytype: 2 },
        include: { all: true },
      });

      return paynmentAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findPaynmentById(getPaynmentDto: GetPaynmentDto) {
    try {
      const paynmentById = await this.paynmentRepository.findByPk(
        getPaynmentDto.id_paynment,
        { include: { all: true } },
      );

      return paynmentById;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updatePayment(updatePaynmentDto: UpdatePaynmentDto) {
    try {
      await this.paynmentRepository.update(
        {
          price: updatePaynmentDto.price,
          notes: updatePaynmentDto.notes,
          id_cashbox: updatePaynmentDto.id_cashbox,
          id_order: updatePaynmentDto.id_order,
          id_order_sup: updatePaynmentDto.id_order_sup,
          id_contract: updatePaynmentDto.id_contract,
          id_paytype: updatePaynmentDto.id_paytype,
          id_payviews: updatePaynmentDto.id_payviews,
        },
        { where: { id_paynment: updatePaynmentDto.id_paynment } },
      );
      const paymentUpdate = await this.paynmentRepository.findByPk(
        updatePaynmentDto.id_paynment
      );
      return paymentUpdate;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }


  async removePaynment(getPaynmentDto: GetPaynmentDto) {
    try {
      const paynmentRemove = await this.paynmentRepository.destroy({
        where: { id_paynment: getPaynmentDto.id_paynment },
      });

      return paynmentRemove;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
