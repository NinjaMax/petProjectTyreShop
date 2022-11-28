import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order_Storage } from '../orders/entities/order-storage.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersStorageService {

  constructor(@InjectModel(Order_Storage) private ordersStorageRepository: typeof Order_Storage,
    //private ordersService: OrdersService
  ) {}

  async createOrderStorage(createOrderDto: CreateOrderDto) {
    
    try {
      
      const orderStorage = await this.ordersStorageRepository.create(createOrderDto);
      
      return orderStorage;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOrdersStorage() {

    try {
      
      const orderStorageAll = await this.ordersStorageRepository.findAll({include:{all: true}});

      return orderStorageAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOrderStorageById(getOrdersDto: GetOrdersDto) {

    try {
      
      const orderSupId = await this.ordersStorageRepository.findByPk(getOrdersDto.id_order_storage, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(updateOrderDto: UpdateOrderDto) {
    return `This action updates a # ordersSupplier`;
  }

  async removeOrderSup(getOrdersDto: GetOrdersDto) {

    try {
      
      const orderSup = await this.ordersStorageRepository.destroy({where: {id_order_storage: getOrdersDto.id_order_storage}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
