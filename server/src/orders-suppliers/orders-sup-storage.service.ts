import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
//import { OrdersSupplier } from './entities/orders-supplier.model';

@Injectable()
export class OrdersSupStorageService {

  constructor(@InjectModel(OrdersSupStorage) private ordersSupStorageRepository: typeof OrdersSupStorage,
    private ordersService: OrdersService
  ) {}

  async createOrderSupStorage(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      const order = await this.ordersService.findOrderById(createOrdersSupplierDto);
      const orderSup = await this.ordersSupStorageRepository.create(createOrdersSupplierDto);

      if(order) {
        
        const orderSupId = await this.ordersSupStorageRepository.findByPk(orderSup.id_order_sup);
        await order.$add('order_sup', [orderSupId.id_order_sup]);
        //order.order_sup.push(orderSupId);

        return orderSupId;
      }
      
      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOrdersSupStorage() {

    try {
      
      const orderSupAll = await this.ordersSupStorageRepository.findAll({include:{all: true}});

      return orderSupAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOrderSupStorageById(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSupId = await this.ordersSupStorageRepository.findByPk(getOrdersSupDto.id_order_sup, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return `This action updates a #${id} ordersSupplier`;
  }

  async removeOrderSupStorage(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSup = await this.ordersSupStorageRepository.destroy({where: {id_order_sup: getOrdersSupDto.id_order_sup}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}