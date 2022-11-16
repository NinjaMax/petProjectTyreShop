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
import { Orders } from './entities/order.model';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Orders) private ordersRepository: typeof Orders,
    private basketService: BasketService,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    //private tyresService: TyresService

  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {

    try {
      //const tyres = await this.tyresService.findTyresById(createOrderDto);

      const basket = await this.basketService.findBasketById(createOrderDto);
      const tyreStock = await this.stockTyresService.findStockTyreById(createOrderDto);
      const wheelStock = await this.stockWheelsService.findStockWheelById(createOrderDto);
      const batteryStock = await this.stockBatteriesService.findStockBatteryById(createOrderDto);
      const oilStock = await this.stockOilsService.findStockOilById(createOrderDto);
      
      const order = await this.ordersRepository.create(createOrderDto);

      if(basket) {
        
        const orderId = await this.ordersRepository.findByPk(order.id_order);
        await basket.$set('order', orderId.id_order);
        basket.order = orderId;

        return orderId;
      }

      if(tyreStock) {
        const orderId = await this.ordersRepository.findByPk(order.id_order); 

        if(tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !==0) {
          const newReserve = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
          await tyreStock.increment('reserve', {by: newReserve});
          await tyreStock.reload();
          await orderId.$add('storage', [tyreStock.storage]);
          orderId.storage.push(tyreStock.storage);

          return orderId;
        }

        if(tyreStock.remainder > createOrderDto.quantity && tyreStock.stock !==0) {
          const orderId = await this.ordersRepository.findByPk(order.id_order);    
          await tyreStock.increment('reserve', {by: createOrderDto.quantity});
          await tyreStock.reload();
          await orderId.$add('storage', [tyreStock.storage]);
          orderId.storage.push(tyreStock.storage);

          return orderId;
        }

        if(tyreStock.remainder == 0) {
          //orderId.storage[Storage.length];
          return `You can not set more "reserve" because does not have remainder. "Remainder 0".`;
        }
        
      }

      if(wheelStock) {

        await wheelStock.increment('reserve', {by: createOrderDto.quantity});
        await wheelStock.reload();

        return order;

      }

      if(batteryStock) {

        await batteryStock.increment('reserve', {by: createOrderDto.quantity});
        await batteryStock.reload();

        return order;

      }

      if(oilStock) {

        await oilStock.increment('reserve', {by: createOrderDto.quantity});
        await oilStock.reload();

        return order;

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
        { id : updateOrderDto.id, 
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
