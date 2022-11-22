import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BasketService } from 'src/basket/basket.service';
import { StockBatteriesService } from 'src/stock/stock-batteries.service';
import { StockOilsService } from 'src/stock/stock-oils.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
//import { TyresService } from 'src/tyres/tyres.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order_Storage } from './entities/order-storage.model';
import { Orders } from './entities/order.model';

@Injectable()
export class OrdersStorageService {

  constructor(@InjectModel(Order_Storage) private orderStorageRepository: typeof Order_Storage,
    private basketService: BasketService,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    //private tyresService: TyresService

  ) {}

  async createOrderStorage(createOrderDto: CreateOrderDto) {

    try {

      const orderStorage = await this.orderStorageRepository.create(createOrderDto);

      return orderStorage;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAllOrdersStorage() {

    try {
      
      const orderAll = await this.orderStorageRepository.findAll({include: {all: true}});

      return orderAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findOrderStorageById(id_order: number) {

    try {
      
      const orderId = await this.orderStorageRepository.findByPk(id_order, {include: {all: true}});

      return orderId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async updateOrderStorage(updateOrderDto: UpdateOrderDto) {

    try {

      const ordersId = await this.orderStorageRepository.findByPk(updateOrderDto.id_order, {include: {all: true}});
      
      if(ordersId) {

        await this.orderStorageRepository.update(
        { id : updateOrderDto.id,
          //quantity: updateOrderDto.quantity,
          //reserve: updateOrderDto.reserve,
          //price: updateOrderDto.price
        }, {where: {id_order : updateOrderDto.id_order}});

        const updateStockOrder = await this.orderStorageRepository.findByPk(updateOrderDto.id_order, {include: {all: true}});

        return updateStockOrder;
      } 

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async removeOrderStorage(getOrdersDto: GetOrdersDto) {

    try {
      
      const removeOrders = await this.orderStorageRepository.destroy({where: {id_order: getOrdersDto.id_order}});

      return removeOrders;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }
}
