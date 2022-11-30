import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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

  async findAllOrdersStorageId(getOrdersDto: GetOrdersDto) {

    try {
      
      const orderStorageAllId = await this.ordersStorageRepository.findAll({where:{id_order: getOrdersDto.id_order}});

      return orderStorageAllId;

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

  async findOrderStorageOne(getOrdersDto: GetOrdersDto) {

    try {
      
      const orderStorageOne = await this.ordersStorageRepository.findOne(
        {where: {id_order_storage: getOrdersDto.id_order_storage}});

      return orderStorageOne;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async updateOrderStorage(updateOrderDto: UpdateOrderDto) {
    
    try {
        const orderStorageUpdate = await this.ordersStorageRepository.update(
            {id: updateOrderDto.id,
            order_index: updateOrderDto.order_index,
            storage_index: updateOrderDto.storage_index, 
            quantity: updateOrderDto.quantity,
            price: updateOrderDto.price
            },{where:{id_order_storage: updateOrderDto.id_order_storage}}
        );

        return orderStorageUpdate;

    } catch {

        throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
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
