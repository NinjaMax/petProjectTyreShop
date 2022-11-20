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
    private priceTyreService: PriceTyresService,
    private orderStorageService: OrdersStorageService, 
    private storageService: StorageService 

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

      if(tyreStock) {
        const orderId = await this.ordersRepository.findByPk(order.id_order); 
        const priceTyre = await this.priceTyreService.findPriceTyresById(createOrderDto);
        
        
        if(tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !==0) {
          const newReserve = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
          await tyreStock.increment('reserve', {by: newReserve});
          await tyreStock.reload();
          await orderId.$add('storage', [tyreStock.storage]);
          orderId.storage.push(tyreStock.storage);
          await orderId.$add('storage', newReserve, {through: { quantity: newReserve}});
          //await orderStorage.$set('id_order', orderId.id_order);
          //const orderStorage = await this.orderStorageService.findOrderStorageById(orderId.id_order);
          await orderId.addStorages( tyreStock.storage.id, {through: { quantity: newReserve}} );
          console.log(newReserve + "NEW RESERVE");
          //orderId?.setOrders()
          //order.setStorages()
          //orderId.$set('storage', [createOrderDto.quantity], {through:{ quantity: createOrderDto.quantity}} );
          //await orderStorage.$set('id', createOrderDto.id);
          //await orderStorage.$set('quantity', createOrderDto.quantity, {through: { quantity: createOrderDto.quantity}});
          //await orderStorage.$set('reserve', newReserve);
          //await orderStorage.$set('price', priceTyre.price);
          //orderStorage.id = createOrderDto.id;
          //orderStorage.quantity = createOrderDto.quantity;
          //orderStorage.reserve = newReserve;
          //orderStorage.price = priceTyre.price;
          //orderStorage.save();

          return orderId;
        }

        if(tyreStock.remainder > createOrderDto.quantity && tyreStock.stock !==0) {
          const orderId = await this.ordersRepository.findByPk(order.id_order);    
          await tyreStock.increment('reserve', {by: createOrderDto.quantity});
          await tyreStock.reload();
          await orderId.$add('storage', [tyreStock.storage]);
          orderId.storage.push(tyreStock.storage);
          

          await orderId.addStorages( tyreStock.storage.id, {through: { quantity: createOrderDto.quantity}} );
          //const orderStorage = await this.orderStorageService.findOrderStorageById(orderId.id_order);
          //orderId.$set( 'storage', createOrderDto.quantity, {through: { quantity: 4}});
          //await orderId.setStorages( tyreStock.storage.id, {through: { quantity: 4}} );
          console.log(createOrderDto.quantity + "QUANTITY");
          //orderStorage.update(
          //  { id : createOrderDto.id,
          //    quantity: createOrderDto.quantity,
          //    reserve: createOrderDto.quantity,
          //    price: priceTyre.price,
          //    id_order: orderStorage.id_order,
          //  }
          //)
          //await orderStorage.$set('id', createOrderDto.id);
          //orderStorage.set('quantity', createOrderDto.quantity, {raw: true});
          //await orderStorage.$set('reserve', createOrderDto.quantity);
          //await orderStorage.$set('price', priceTyre.price);
          //orderStorage.id = createOrderDto.id;
          //orderStorage.quantity = createOrderDto.quantity;
          //orderStorage.reserve = createOrderDto.quantity;
          //orderStorage.price = priceTyre.price;
          //orderStorage.save();

          return orderId;
        }

        if(tyreStock.remainder == 0 || tyreStock.stock == 0) {
          //orderId.storage[Storage.length];
          //const orderId = await this.ordersRepository.findByPk(order.id_order);
          //orderId.storage.order_storage.
          //const orderIdUpdate = await this.ordersRepository.update({reserve: 0}, {where: {id_order: order.id_order}});
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
