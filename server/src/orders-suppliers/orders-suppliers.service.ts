import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupplier } from './entities/orders-supplier.model';

@Injectable()
export class OrdersSuppliersService {

  constructor(@InjectModel(OrdersSupplier) private ordersSupRepository: typeof OrdersSupplier,
    private ordersService: OrdersService
  ) {}

  async createOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      const order = await this.ordersService.findOrderById(createOrdersSupplierDto);
      const orderSup = await this.ordersSupRepository.create(createOrdersSupplierDto);

      if(order) {
        
        const orderSupId = await this.ordersSupRepository.findByPk(orderSup.id_order_sup);
        await order.$add('order_sup', [orderSupId.id_order_sup]);
        order.order_sup.push(orderSupId);

        return orderSupId;
      }
      
      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOrdersSup() {

    try {
      
      const orderSupAll = await this.ordersSupRepository.findAll({include:{all: true}});

      return orderSupAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOrderSupById(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSupId = await this.ordersSupRepository.findByPk(getOrdersSupDto.id_order_sup, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return `This action updates a #${id} ordersSupplier`;
  }

  async removeOrderSup(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSup = await this.ordersSupRepository.destroy({where: {id_order_sup: getOrdersSupDto.id_order_sup}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
