import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { InjectModel } from '@nestjs/sequelize';
import { BasketService } from 'src/basket/basket.service';
//import { PriceTyresService } from 'src/prices/price-tyres.service';
import { StockBatteriesService } from 'src/stock/stock-batteries.service';
import { StockOilsService } from 'src/stock/stock-oils.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
import { StorageService } from 'src/storage/storage.service';
import { scheduler } from 'timers/promises';
import { yieldToMain } from './createOrder.service';
//import { TyresService } from 'src/tyres/tyres.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';
//import { OrdersConfigAttr } from './interfaces/orders.interface';
import { OrdersStorageService } from './orders-storage.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders) private ordersRepository: typeof Orders,
    private basketService: BasketService,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    //private priceTyreService: PriceTyresService,
    private storageService: StorageService,
    private ordersStorageService: OrdersStorageService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    //try {
      const basket = await this.basketService.findBasketById(createOrderDto);
      const order = await this.ordersRepository.create(createOrderDto);

      if (basket) {
        const orderId: Orders = await this.ordersRepository.findByPk(
          order.id_order,
        );
        await basket.$set('order', orderId.id_order);
        basket.order = orderId;

        return orderId;
      }

      return order;
    //} catch {
      // throw new HttpException(
      //   'Data is incorrect and must be uniq',
      //   HttpStatus.NOT_FOUND,
      // );
    //}
  }

  async findAllOrders() {
    try {
      const orderAll = await this.ordersRepository.findAll({
        include: { all: true },
      });

      return orderAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderById(getOrdersDto: GetOrdersDto) {
    try {
      const orderId = await this.ordersRepository.findByPk(
        getOrdersDto.id_order,
        {
          include: { all: true },
        },
      );

      return orderId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderByCustomer(getOrdersDto: GetOrdersDto) {
    try {
      const orderCustomer = await this.ordersRepository.findOne({
        where: { id_customer: getOrdersDto.id_customer },
      });

      return orderCustomer;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createGoodsToOrder(createOrderDto: CreateOrderDto) {
    try {
      if (createOrderDto.id_order_storage) {
        await this.ordersStorageService.updateOrderStorage(createOrderDto);

        const findGoodsToOrder =
          await this.ordersStorageService.findOrderStorageOne(createOrderDto);

        return findGoodsToOrder;
      } else {
        const orderStorage = await this.ordersStorageService.createOrderStorage(
          createOrderDto,
        );

        return orderStorage;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async tyreStockOrder(createOrderDto: CreateOrderDto) {

    const orderIdTyre = await this.ordersRepository.findByPk(
        createOrderDto.id_order, {include: { all: true }},
      );

      const tyreStock = await this.stockTyresService.findStockTyreById(
        createOrderDto,
      );
      const storageTyreStorage = await this.storageService.findStorageByIdOrder(
        createOrderDto,
      );
      const orderStorageIdTyre =
        await this.ordersStorageService.findOrderStorageById(createOrderDto);
    
        let stockTyreExists = null;
        let newReserveTyre = 0;
            

      if (tyreStock) {
        if (tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !== 0) {
          newReserveTyre = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
          stockTyreExists = tyreStock;
        } else if (tyreStock.remainder >= createOrderDto.quantity && tyreStock.stock !== 0) {
          stockTyreExists = tyreStock;
        } else {
          throw new HttpException (
            `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
          HttpStatus.BAD_REQUEST);
        }
      }
    
      if (stockTyreExists) {
        await stockTyreExists.increment('reserve', { by: newReserveTyre || createOrderDto.quantity });
        //await stockTyreExists.reload();
        await orderStorageIdTyre.increment('reserve', { by: newReserveTyre || createOrderDto.quantity });
        //await orderStorageIdTyre.reload();
        await orderIdTyre.$add('order_storage', orderStorageIdTyre);
        await storageTyreStorage.$add('order_storage', orderStorageIdTyre);
        
      }
      //oilStock = null;
      await orderIdTyre.reload();

      return orderIdTyre;
    }
    
    async wheelStockOrder(createOrderDto: CreateOrderDto) {
    
        const orderIdWheel = await this.ordersRepository.findByPk(
            createOrderDto.id_order, {include: { all: true }},
          );
          const wheelStock = await this.stockWheelsService.findStockWheelById(
            createOrderDto,
          );
          const storageStorageWheel = await this.storageService.findStorageById(
            createOrderDto,
          );
          const orderStorageIdWheel =
            await this.ordersStorageService.findOrderStorageById(createOrderDto);
    
            let stockWheelExists = null;
            let newReserveWheel = 0;
                
    
          if (wheelStock) {
            if (wheelStock.remainder < createOrderDto.quantity && wheelStock.stock !== 0) {
              newReserveWheel = createOrderDto.quantity - (createOrderDto.quantity - wheelStock.remainder);
              stockWheelExists = wheelStock;
            } else if (wheelStock.remainder >= createOrderDto.quantity && wheelStock.stock !== 0) {
              stockWheelExists = wheelStock;
            } else {
              throw new HttpException (
                `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
                HttpStatus.BAD_REQUEST);
            }
          }
        
          if (stockWheelExists) {
            await stockWheelExists.increment('reserve', { by: newReserveWheel || createOrderDto.quantity });
            //await stockWheelExists.reload();
            await orderStorageIdWheel.increment('reserve', { by: newReserveWheel || createOrderDto.quantity });
            //await orderStorageIdWheel.reload();
            await orderIdWheel.$add('order_storage', orderStorageIdWheel);
            await storageStorageWheel.$add('order_storage', orderStorageIdWheel);
            
          }
          //oilStock = null;
          await orderIdWheel.reload();
          return orderIdWheel;
    }

    async batteryStockOrder(createOrderDto: CreateOrderDto) {
        const orderIdBattery = await this.ordersRepository.findByPk(
            createOrderDto.id_order, {include: { all: true }},
          );
    
          const batteryStock =
            await this.stockBatteriesService.findStockBatteryById(createOrderDto);
    
          const storageStorageBattery = await this.storageService.findStorageById(
            createOrderDto,
          );
          const orderStorageIdBattery =
            await this.ordersStorageService.findOrderStorageById(createOrderDto);
    
            let stockBatteryExists = null;
            let newReserveBattery = 0;
                
    
          if (batteryStock) {
            if (batteryStock.remainder < createOrderDto.quantity && batteryStock.stock !== 0) {
              newReserveBattery = createOrderDto.quantity - (createOrderDto.quantity - batteryStock.remainder);
              stockBatteryExists = batteryStock;
            } else if (batteryStock.remainder >= createOrderDto.quantity && batteryStock.stock !== 0) {
              stockBatteryExists = batteryStock;
            } else {
              throw new HttpException (
                `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
              HttpStatus.BAD_REQUEST);
            }
          }
        
          if (stockBatteryExists) {
            await stockBatteryExists.increment('reserve', { by: newReserveBattery || createOrderDto.quantity });
            //await stockBatteryExists.reload();
            await orderStorageIdBattery.increment('reserve', { by: newReserveBattery || createOrderDto.quantity });
            //await orderStorageIdBattery.reload();
            await orderIdBattery.$add('order_storage', orderStorageIdBattery);
            await storageStorageBattery.$add('order_storage', orderStorageIdBattery);
            
          }
          //oilStock = null;
          await orderIdBattery.reload();
          return orderIdBattery;
        // } catch {
        //   throw new HttpException(
        //     'Data is incorrect and must be uniq',
        //     HttpStatus.NOT_FOUND,
        //   );
        // }
    }
    
    async oilStockOrder(createOrderDto: CreateOrderDto) {
        const orderIdOil = await this.ordersRepository.findByPk(
            createOrderDto.id_order, {include: { all: true }},
          );
        
        const oilStock = await this.stockOilsService.findStockOilById(
            createOrderDto,
          );
        const storageStorageOil = await this.storageService.findStorageById(
            createOrderDto,
          );
        const orderStorageIdOil =
            await this.ordersStorageService.findOrderStorageById(createOrderDto);
          
      
        let stockOilExists = null;
        let newReserveOil = 0;
            

      if (oilStock) {
        if (oilStock.remainder < createOrderDto.quantity && oilStock.stock !== 0) {
          newReserveOil = createOrderDto.quantity - (createOrderDto.quantity - oilStock.remainder);
          stockOilExists = oilStock;
        } else if (oilStock.remainder >= createOrderDto.quantity && oilStock.stock !== 0) {
          stockOilExists = oilStock;
        } else {
          throw new HttpException (
            `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
            HttpStatus.BAD_REQUEST);
        }
      }
    
      if (stockOilExists) {
        await stockOilExists.increment('reserve', { by: newReserveOil || createOrderDto.quantity });
        //await stockOilExists.reload();
        await orderStorageIdOil.increment('reserve', { by: newReserveOil || createOrderDto.quantity });
        //await orderStorageIdOil.reload();
        await orderIdOil.$add('order_storage', orderStorageIdOil);
        await storageStorageOil.$add('order_storage', orderStorageIdOil);
        
      }
      //oilStock = null;
      
      await orderIdOil.reload();
      return orderIdOil;
      // } catch {
      //   throw new HttpException(
      //     'Data is incorrect and must be uniq',
      //     HttpStatus.NOT_FOUND,
      //   );
      // }
    
  }

  async addGoodsToOrder(createOrderDto: CreateOrderDto) {

    const tyreStock = await this.stockTyresService.findStockTyreById(
      createOrderDto,
    );
    const wheelStock = await this.stockWheelsService.findStockWheelById(
      createOrderDto,
    );
    const batteryStock = await this.stockBatteriesService.findStockBatteryById(
      createOrderDto,
    );
    const oilStock = await this.stockOilsService.findStockOilById(
      createOrderDto,
    );
   
      if (tyreStock) {
        const orderAddTyre = await this.tyreStockOrder(createOrderDto);
        return orderAddTyre;
      }

      if (wheelStock) {
        const orderAddWheel = await this.wheelStockOrder(createOrderDto);
        return orderAddWheel;
      }

      if (batteryStock) {
        const orderAddBattery = await this.batteryStockOrder(createOrderDto);
        return orderAddBattery;
      }

      if (oilStock) {
        const orderAddOil = await this.oilStockOrder(createOrderDto);
        return orderAddOil;
      }

  }

  async updateOrder(updateOrderDto: UpdateOrderDto) {
    try {
      const ordersId = await this.ordersRepository.findByPk(
        updateOrderDto.id_order,
        { include: { all: true } },
      );

      if (ordersId) {
        await this.ordersRepository.update(
          {
            id: updateOrderDto.id,
            id_user: updateOrderDto.id_user,
            notes: updateOrderDto.notes,
          },
          { where: { id_order: updateOrderDto.id_order } },
        );

        const orderAfterUpdate = await this.ordersRepository.findByPk(
          updateOrderDto.id_order,
          { include: { all: true } },
        );

        return orderAfterUpdate;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeOrder(getOrdersDto: GetOrdersDto) {
    try {
      const removeOrders = await this.ordersRepository.destroy({
        where: { id_order: getOrdersDto.id_order },
      });

      return removeOrders;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
