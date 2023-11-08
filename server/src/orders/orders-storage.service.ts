import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//import { Op } from 'sequelize';
import { Order_Storage } from '../orders/entities/order-storage.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import sequelize from 'sequelize';

@Injectable()
export class OrdersStorageService {
  constructor(
    @InjectModel(Order_Storage)
    private ordersStorageRepository: typeof Order_Storage, //private ordersService: OrdersService
  ) {}

  async createOrderStorage(createOrderDto: CreateOrderDto) {
    try {
      const orderStorage = await this.ordersStorageRepository.create(
        createOrderDto
      );

      return orderStorage;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrdersStorage() {
    try {
      const orderStorageAll = await this.ordersStorageRepository.findAll({
        include: { all: true },
      });

      return orderStorageAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrdersStorageLeader() {
    try {
      const orderStorageAllLeader = await this.ordersStorageRepository.findAll({
        include: [{ all: true }],
        attributes: [
          'id',
          'full_name',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count_id'],
        ],
        group: [
          'id',
          'order.id_order',
          'storage.id_storage',
          'Order_Storage.full_name',
        ],
        order: [['count_id', 'DESC']],
        limit: 8,
      });

      return orderStorageAllLeader;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrdersStorageId(getOrdersDto: GetOrdersDto) {
    try {
      const orderStorageAllId = await this.ordersStorageRepository.findAll({
        where: { id_order: getOrdersDto.id_order },
      });

      return orderStorageAllId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderStorageById(getOrdersDto: GetOrdersDto) {
    try {
      const orderSupId = await this.ordersStorageRepository.findByPk(
        getOrdersDto.id_order_storage,
        { include: { all: true } },
      );

      return orderSupId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderStorageOne(getOrdersDto: GetOrdersDto) {
    try {
      const orderStorageOne = await this.ordersStorageRepository.findOne({
        where: { id_order_storage: getOrdersDto.id_order_storage },
      });
      if (orderStorageOne) {
        return orderStorageOne;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllGoodsOrderStorage(getOrdersDto: GetOrdersDto) {
    try {
      const orderStorageOne = await this.ordersStorageRepository.findAll({
        where: { id_order: getOrdersDto.id_order },
      });

      return orderStorageOne;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOrderStorage(updateOrderDto: UpdateOrderDto) {
    try {
      const orderStorageUpdate = await this.ordersStorageRepository.update(
        {
          id: updateOrderDto.id,
          order_index: updateOrderDto.order_index,
          storage_index: updateOrderDto.storage_index,
          quantity: updateOrderDto.quantity,
          price: updateOrderDto.price,
          id_supplier: updateOrderDto.id_supplier,
          category: updateOrderDto.category,
          id_order: updateOrderDto.id_order,
          id_storage: updateOrderDto.id_storage,
          ref_diameter: updateOrderDto.ref_diameter,
          weight: updateOrderDto.weight,
          ref_weight: updateOrderDto.ref_weight,
        },
        { where: { id_order_storage: updateOrderDto.id_order_storage } },
      );

      return orderStorageUpdate;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeOrderStorageById(getOrdersDto: GetOrdersDto) {
    try {
      const orderSup = await this.ordersStorageRepository.destroy({
        where: { id_order_storage: getOrdersDto.id_order_storage },
      });

      return orderSup;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
