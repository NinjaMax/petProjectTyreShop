import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BasketService } from 'src/basket/basket.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Orders) private ordersRepository: typeof Orders,
    private basketService: BasketService  
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {

    try {

      const basket = await this.basketService.findBasketById(createOrderDto);
      
      const order = await this.ordersRepository.create(createOrderDto);

      if(basket) {
        
        const orderId = await this.ordersRepository.findByPk(order.id_order);
        await basket.$set('order', orderId.id_order);
        basket.order = orderId;

        return orderId;
      }

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

  async updateOrder(updateOrderDto: UpdateOrderDto) {

    try {

      const ordersId = await this.ordersRepository.findByPk(updateOrderDto.id_order, {include: {all: true}});
      
      if(ordersId) {

        await this.ordersRepository.update(
        { id_goods : updateOrderDto.id_goods, 
          id_cat : updateOrderDto.id_cat,
          goods : updateOrderDto.goods,
          quantity : updateOrderDto.quantity,
          price : updateOrderDto.price,
          reserve : updateOrderDto.reserve,
          total: updateOrderDto.total,
          notes: updateOrderDto.notes,

        }, {where: {id_order : updateOrderDto.id_order}});

        const updateStockOrder = await this.ordersRepository.findByPk(updateOrderDto.id_order, {include: {all: true}});

        return updateStockOrder;
      } 

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async removeOrder(getOrdersDto: GetOrdersDto) {

    try {
      
      const removeOrders = await this.ordersRepository.destroy({where: {id_order: getOrdersDto.id_order}});

      return removeOrders;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }
}
