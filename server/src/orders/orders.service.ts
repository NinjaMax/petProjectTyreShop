import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BasketService } from 'src/basket/basket.service';
import { PriceTyresService } from 'src/prices/price-tyres.service';
import { StockBatteriesService } from 'src/stock/stock-batteries.service';
import { StockOilsService } from 'src/stock/stock-oils.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
import { StorageService } from 'src/storage/storage.service';
//import { TyresService } from 'src/tyres/tyres.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';
import { OrdersConfigAttr } from './interfaces/orders.interface';
import { OrdersStorageService } from './orders-storage.service';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Orders) private ordersRepository: typeof Orders,
    private basketService: BasketService,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    //private priceTyreService: PriceTyresService,
    private storageService: StorageService, 
    private ordersStorageService: OrdersStorageService

  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {

    try {
      //const tyres = await this.tyresService.findTyresById(createOrderDto);

      const basket = await this.basketService.findBasketById(createOrderDto);
      const tyreStock = await this.stockTyresService.findStockTyreById(createOrderDto);
      const wheelStock = await this.stockWheelsService.findStockWheelById(createOrderDto);
      const batteryStock = await this.stockBatteriesService.findStockBatteryById(createOrderDto);
      const oilStock = await this.stockOilsService.findStockOilById(createOrderDto);
      //const storageStorage  = await this.storageService.findStorageById(createOrderDto);
      const order = await this.ordersRepository.create(createOrderDto);
      
      //const orderStorage = await this.orderStorageService.createOrderStorage(createOrderDto);

      if(basket) {
        
        const orderId: Orders = await this.ordersRepository.findByPk(order.id_order);
        await basket.$set('order', orderId.id_order);
        basket.order = orderId;

        return orderId;
      }

      return order;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAllOrders() {

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

  async createGoodsToOrder(createOrderDto: CreateOrderDto) {

    try {

      const findGoodsToOrder = await this.ordersStorageService.findOrderStorageOne(createOrderDto);

      if( findGoodsToOrder.id_order_storage !== 0 ) {

        const updateOrderItem = this.ordersStorageService.updateOrderStorage(createOrderDto);

        return updateOrderItem;

      } else {

        const orderStorage = await this.ordersStorageService.createOrderStorage(createOrderDto);
        
        return orderStorage;

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async addGoodsToOrder(createOrderDto: CreateOrderDto) {

    try {
      //const ordersStorageAllId = this.ordersStorageService.findAllOrdersStorageId(createOrderDto);
      
      const orderId = await this.ordersRepository.findByPk(createOrderDto.id_order, {include: {all: true}});
      const tyreStock = await this.stockTyresService.findStockTyreById(createOrderDto);
      const wheelStock = await this.stockWheelsService.findStockWheelById(createOrderDto);
      const batteryStock = await this.stockBatteriesService.findStockBatteryById(createOrderDto);
      const oilStock = await this.stockOilsService.findStockOilById(createOrderDto);
      const storageStorage  = await this.storageService.findStorageById(createOrderDto);
      //const orderStorage = await this.ordersStorageService.createOrderStorage(createOrderDto);
      const orderStorageId = await this.ordersStorageService.findOrderStorageById(createOrderDto);
      //const findIdInOrder = orderId.$get('storage_orders', 
      //  {include: { all: true, through: {attributes: ['id']}}})

      if( tyreStock ) {
        
        if(tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !==0 ) {

          const newReserve = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
          await tyreStock.increment('reserve', {by: newReserve});
          await tyreStock.reload();
          await orderStorageId.increment('reserve', {by: newReserve});
          //orderStorageId.id_order = createOrderDto.id_order;
          //orderStorageId.id_storage = createOrderDto.id_storage;
          await orderStorageId.reload();

          await orderId.$add('order_storage', orderStorageId);
          await storageStorage.$add('order_storage', orderStorageId);
          //orderId.order_storage.push(orderStorageId);
          await orderId.reload();

          return orderId;
        }

        if( tyreStock.remainder > createOrderDto.quantity && tyreStock.stock !==0 ) {
          //const orderId = await this.ordersRepository.findByPk(order.id_order);    
          await tyreStock.increment('reserve', {by: createOrderDto.quantity});
          await tyreStock.reload();
          await orderStorageId.increment('reserve', {by: createOrderDto.quantity});
          //orderStorageId.id_order = createOrderDto.id_order;
          //orderStorageId.id_storage = createOrderDto.id_storage;
          await orderStorageId.reload();
          //await orderId.increment('reserve', {by: createOrderDto.quantity})
          await orderId.$add('order_storage', orderStorageId);
          await storageStorage.$add('order_storage', orderStorageId);
          //orderId.order_storage.push(orderStorageId);

          await orderId.reload();

          return orderId;
        }

        if(tyreStock.remainder == 0 || tyreStock.stock == 0 || tyreStock.id_storage !== createOrderDto.id_storage ) {
          
          //orderId.storage[Storage.length];
          //const orderId = await this.ordersRepository.findByPk(order.id_order);
          //orderId.storage.order_storage.
          //const orderIdUpdate = await this.ordersRepository.update({reserve: 0}, {where: {id_order: order.id_order}});
          return `You can not set more "reserve" 
            because does not have remainder. "Remainder 0".`;
        }
        
      }

      if(wheelStock) {

        await wheelStock.increment('reserve', {by: createOrderDto.quantity});
        await wheelStock.reload();

        return orderId;

      }

      if(batteryStock) {

        await batteryStock.increment('reserve', {by: createOrderDto.quantity});
        await batteryStock.reload();

        return orderId;

      }

      if(oilStock) {

        await oilStock.increment('reserve', {by: createOrderDto.quantity});
        await oilStock.reload();

        return orderId;

      }

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
          id_user: updateOrderDto.id_user, 
          notes: updateOrderDto.notes,
        }, {where: {id_order : updateOrderDto.id_order}});

        ordersId.$set('order_storage', [ordersId.order_storage[updateOrderDto.n]], 
        {through: {quantity: updateOrderDto.quantity, id: updateOrderDto.id,
          reserve: updateOrderDto.reserve, price: updateOrderDto.price,}});
        //ordersId.storage_orders.push(ordersId.storage_orders[0]);
        ordersId.reload();
        
        const orderAfterUpdate = await this.ordersRepository.findByPk(updateOrderDto.id_order, {include: {all: true}});

        return orderAfterUpdate;
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
