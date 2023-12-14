import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { OrdersService } from '../orders/orders.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
//import { OrdersSupplier } from './entities/orders-supplier.model';

@Injectable()
export class OrdersSupStorageService {

  constructor(
    @InjectModel(OrdersSupStorage)
    private ordersSupStorageRepository: typeof OrdersSupStorage,
    private ordersService: OrdersService
  ) {}

  async createOrderSupStorage(
    createOrdersSupplierDto: CreateOrdersSupplierDto
  ) {
    try {
      const orderSup = await this.ordersSupStorageRepository.create(
        createOrdersSupplierDto
      );
      return orderSup;
    } catch {

      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createOrderSupStorageNew(
  {
    id,
    id_order,
    id_supplier,
    quantity,
    price,
    storage_index,
    price_wholesale,
    total,
    id_storage,
    id_order_sup,
    order_sup_index,
    }
  ) {
    //try {
      const orderSup = await this.ordersSupStorageRepository.create(
        { 
          id, 
          id_order, 
          id_supplier, 
          quantity, 
          price, 
          storage_index,
          price_wholesale,
          total,
          id_storage,
          id_order_sup,
          order_sup_index,
        },
        // {
        //   fields: [
        //     'id',
        //     'id_order',
        //     'id_supplier',
        //     'quantity',
        //     'price',
        //     'storage_index',
        //   ],
        // }
        );
      return orderSup;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findAllOrdersSupStorage() {
    try {
      const orderSupAll = await this.ordersSupStorageRepository.findAll({
        include: { all: true },
      });
      return orderSupAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrdersSupStorageByOrd(getOrdersSupDto: GetOrdersSuppliersDto) {
    //try { 
      const orderSupAllByOrder = await this.ordersSupStorageRepository.findAll({
        where: { id_order: getOrdersSupDto.id_order }
      });

      return orderSupAllByOrder;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findOrdersSupStorageByOrdSup(getOrdersSupDto: GetOrdersSuppliersDto) {
    //try {
      const orderSupAllByOrderSup =
        await this.ordersSupStorageRepository.findOne({
          where: { order_sup_index: getOrdersSupDto.id_order_sup }
      });
      return orderSupAllByOrderSup;

    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findAllOrdersSupStorageByOrdSup(
    getOrdersSupDto: GetOrdersSuppliersDto,
  ) {
    try { 
      const orderSupAllByOrderSup = 
        await this.ordersSupStorageRepository.findAll({
          where: { 
            [Op.or]:[
              {id_order_sup: getOrdersSupDto.id_order_sup},
              {order_sup_index: getOrdersSupDto.order_sup_index} 
            ]
          },
        });
      return orderSupAllByOrderSup;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderSupStorageById(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {   
      const orderSupId = await this.ordersSupStorageRepository.findByPk(getOrdersSupDto.id_order_sup, {include: {all: true}});
      return orderSupId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOrderSupStorage(
    updateOrdersSupplierDto: UpdateOrdersSupplierDto
  ) {
    try {
      const orderStorageUpdate = await this.ordersSupStorageRepository.update(
        {
          id: updateOrdersSupplierDto.id,
          order_sup_index: updateOrdersSupplierDto.order_sup_index,
          storage_index: updateOrdersSupplierDto.storage_index,
          id_order_sup: updateOrdersSupplierDto.id_order_sup,
          id_storage: updateOrdersSupplierDto.id_storage, 
          quantity: updateOrdersSupplierDto.quantity,
          price: updateOrdersSupplierDto.price,
          price_wholesale: updateOrdersSupplierDto.price_wholesale
        },
        {
          where: {
            id_order_sup_storage: updateOrdersSupplierDto.id_order_sup_storage,
          },
        },
      );
      return orderStorageUpdate;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeOrderSupStorage(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {
      const orderSup = await this.ordersSupStorageRepository.destroy({
        where: { id_order_sup: getOrdersSupDto.id_order_sup },
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