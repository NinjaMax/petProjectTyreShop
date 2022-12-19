import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CashboxService } from 'src/cashbox/cashbox.service';
import { ContractService } from 'src/contract/contract.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IncomesService } from 'src/incomes/incomes.service';
import { OrdersSuppliersService } from 'src/orders-suppliers/orders-suppliers.service';
import { OrdersService } from 'src/orders/orders.service';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
import { Paynment } from './entities/paynment.model';

@Injectable()
export class PaynmentService {

  constructor(@InjectModel(Paynment) private paynmentRepository: typeof Paynment,
    private orderService: OrdersService,
    private ordersSupService: OrdersSuppliersService,
    private cashboxService: CashboxService,
    private expensesService: ExpensesService,
    private incomesService: IncomesService,
    private contractService: ContractService 
  ) {}

  async createPaynment(createPaynmentDto: CreatePaynmentDto) {
    
    try {

      const order = await this.orderService.findOrderById(createPaynmentDto);
      const orderSup = await this.ordersSupService.findOrderSupById(createPaynmentDto);
      const cashBox = await this.cashboxService.findCashboxById(createPaynmentDto);
      const income = await this.incomesService.findIncomeById(createPaynmentDto);
      const expense = await this.expensesService.findExpenseById(createPaynmentDto);
      const contract = await this.contractService.findContractById(createPaynmentDto);
      const paynment = await this.paynmentRepository.create(createPaynmentDto);
      
      if( expense ) {

        const paynmentIdExp = await this.paynmentRepository.findByPk(paynment.id_paynment);

        if(order) {
          await order.$add('paynment', paynmentIdExp.id_paynment);
          order.paynment.push(paynmentIdExp);
          
        }

        if(orderSup) {
          await orderSup.$add('paynment', paynmentIdExp.id_paynment);
          orderSup.paynment.push(paynmentIdExp);
        }

        await expense.$add('paynment', paynmentIdExp.id_paynment);
        //expense.paynment.push(paynmentIdExp);
        await contract.decrement('balance', {by: paynmentIdExp.price});
        await cashBox.decrement('funds', {by: paynmentIdExp.price});
        await contract.reload();
        await cashBox.reload();
        
        return paynmentIdExp;
      }

      if( income ) {
        
        const paynmentIdInc = await this.paynmentRepository.findByPk(paynment.id_paynment);
        
        if(order) {
          await order.$add('paynment', paynmentIdInc.id_paynment);
          order.paynment.push(paynmentIdInc);
        }

        if(orderSup) {
          await orderSup.$add('paynment', paynmentIdInc.id_paynment);
          orderSup.paynment.push(paynmentIdInc);
        }

        await income.$add('paynment', paynmentIdInc.id_paynment);
        //income.paynment.push(paynmentIdInc);
        await contract.increment('balance', {by: paynmentIdInc.price});
        await cashBox.increment('funds', {by: paynmentIdInc.price});
        await contract.reload();
        await cashBox.reload();

        return paynmentIdInc;
      }

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
