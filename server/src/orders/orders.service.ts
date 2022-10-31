import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Orders) private ordersRepository: typeof Orders,
    ) {}

  async createOrder(createOrderDto: CreateOrderDto) {

    try {
      
      const order = await this.ordersRepository.create(createOrderDto);

      return order;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAllorders() {

    try {
      
      const orderAll = await this.ordersRepository.findAll({include: {all: true}});

      return orderAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findOrderById(getOrdersDto: GetOrdersDto) {

    try {
      
      const orderId = await this.ordersRepository.findByPk(getOrdersDto.id_order, {include: {all: true}});

      return orderId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async removeOrder(getOrdersDto: GetOrdersDto) {

    try {
      
      const removeOrder = await this.ordersRepository.destroy({where: {id_order: getOrdersDto.id_order}});

      return removeOrder;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }
}
