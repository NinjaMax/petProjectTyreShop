import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { InjectModel } from '@nestjs/sequelize';
//import { TyresService } from 'src/tyres/tyres.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';
//import { OrdersConfigAttr } from './interfaces/orders.interface';
import { OrdersStorageService } from './orders-storage.service';
import { BasketService } from '../basket/basket.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { StorageService } from '../storage/storage.service';
import { CustomersService } from '../customers/customers.service';

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
    private customerService: CustomersService,
    private storageService: StorageService,
    private ordersStorageService: OrdersStorageService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const basket = await this.basketService.findBasketById(createOrderDto);
      const order = await this.ordersRepository.create(createOrderDto);
      const customer = await this.customerService.findOrCreateCustmer(
        createOrderDto,
      );
      if (basket) {
        const orderId: Orders = await this.ordersRepository.findByPk(
          order.id_order,
        );
        await basket.$set('order', orderId.id_order);
        basket.order = orderId;

        return orderId;
      } else if (customer) {
        order.$add('customer', customer.id_customer);
        order.reload();
        return order;
      } else {
        return order;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
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
      const findGoodsToOrder =
        await this.ordersStorageService.findOrderStorageOne(createOrderDto);

      if (findGoodsToOrder) {
        const updateOrderStor =
          await this.ordersStorageService.updateOrderStorage(createOrderDto);

        return updateOrderStor;
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
      createOrderDto.id_order,
      { include: { all: true } },
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
      if (
        tyreStock.remainder < createOrderDto.quantity &&
        tyreStock.stock !== 0
      ) {
        newReserveTyre =
          createOrderDto.quantity -
          (createOrderDto.quantity - tyreStock.remainder);
        stockTyreExists = tyreStock;
      } else if (
        tyreStock.remainder >= createOrderDto.quantity &&
        tyreStock.stock !== 0
      ) {
        stockTyreExists = tyreStock;
      } else {
        throw new HttpException(
          `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (stockTyreExists) {
      await stockTyreExists.increment('reserve', {
        by: newReserveTyre || createOrderDto.quantity,
      });
      //await stockTyreExists.reload();
      await orderStorageIdTyre.increment('reserve', {
        by: newReserveTyre || createOrderDto.quantity,
      });
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
      createOrderDto.id_order,
      { include: { all: true } },
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
      if (
        wheelStock.remainder < createOrderDto.quantity &&
        wheelStock.stock !== 0
      ) {
        newReserveWheel =
          createOrderDto.quantity -
          (createOrderDto.quantity - wheelStock.remainder);
        stockWheelExists = wheelStock;
      } else if (
        wheelStock.remainder >= createOrderDto.quantity &&
        wheelStock.stock !== 0
      ) {
        stockWheelExists = wheelStock;
      } else {
        throw new HttpException(
          `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (stockWheelExists) {
      await stockWheelExists.increment('reserve', {
        by: newReserveWheel || createOrderDto.quantity,
      });
      //await stockWheelExists.reload();
      await orderStorageIdWheel.increment('reserve', {
        by: newReserveWheel || createOrderDto.quantity,
      });
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
      createOrderDto.id_order,
      { include: { all: true } },
    );

    const batteryStock = await this.stockBatteriesService.findStockBatteryById(
      createOrderDto,
    );

    const storageStorageBattery = await this.storageService.findStorageById(
      createOrderDto,
    );
    const orderStorageIdBattery =
      await this.ordersStorageService.findOrderStorageById(createOrderDto);

    let stockBatteryExists = null;
    let newReserveBattery = 0;

    if (batteryStock) {
      if (
        batteryStock.remainder < createOrderDto.quantity &&
        batteryStock.stock !== 0
      ) {
        newReserveBattery =
          createOrderDto.quantity -
          (createOrderDto.quantity - batteryStock.remainder);
        stockBatteryExists = batteryStock;
      } else if (
        batteryStock.remainder >= createOrderDto.quantity &&
        batteryStock.stock !== 0
      ) {
        stockBatteryExists = batteryStock;
      } else {
        throw new HttpException(
          `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (stockBatteryExists) {
      await stockBatteryExists.increment('reserve', {
        by: newReserveBattery || createOrderDto.quantity,
      });
      //await stockBatteryExists.reload();
      await orderStorageIdBattery.increment('reserve', {
        by: newReserveBattery || createOrderDto.quantity,
      });
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
      createOrderDto.id_order,
      { include: { all: true } },
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
      if (
        oilStock.remainder < createOrderDto.quantity &&
        oilStock.stock !== 0
      ) {
        newReserveOil =
          createOrderDto.quantity -
          (createOrderDto.quantity - oilStock.remainder);
        stockOilExists = oilStock;
      } else if (
        oilStock.remainder >= createOrderDto.quantity &&
        oilStock.stock !== 0
      ) {
        stockOilExists = oilStock;
      } else {
        throw new HttpException(
          `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (stockOilExists) {
      await stockOilExists.increment('reserve', {
        by: newReserveOil || createOrderDto.quantity,
      });
      //await stockOilExists.reload();
      await orderStorageIdOil.increment('reserve', {
        by: newReserveOil || createOrderDto.quantity,
      });
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
        const updateOrder = await this.ordersRepository.update(
          {
            id: updateOrderDto.id,
            id_user: updateOrderDto.id_user,
            notes: updateOrderDto.notes,
            organisation: updateOrderDto.organisation,
            storage: updateOrderDto.storage,
            order_view: updateOrderDto.order_view,
            delivery: updateOrderDto.delivery,
            status_delivery: updateOrderDto.status_delivery,
            delivery_ttn: updateOrderDto.delivery_ttn,
            status: updateOrderDto.status,
            pay_view: updateOrderDto.pay_view,
            status_pay: updateOrderDto.status_pay,
            dop_garanty: updateOrderDto.dop_garanty,
            id_customer: updateOrderDto.id_customer,
            id_contract: updateOrderDto.id_contract,
          },
          { where: { id_order: updateOrderDto.id_order } },
        );

        // const orderAfterUpdate = await this.ordersRepository.findByPk(
        //   updateOrderDto.id_order,
        //   { include: { all: true } },
        // );
        // updateOrder.reload();
        return updateOrder;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async tyreStockUpdateOrder(createOrderDto: CreateOrderDto) {
    //try {
    const orderIdTyreUpdate = await this.ordersRepository.findByPk(
      createOrderDto.id_order ?? createOrderDto.order_index,
      { include: { all: true } },
      );

    const tyreStockUpdate = await this.stockTyresService.findStockTyreById(
      createOrderDto,
      );
      // const storageStorageTyreUpdate =
      //   await this.storageService.findStorageById(createOrderDto);
      // const orderStorageIdOilUpdate =
      //   await this.ordersStorageService.removeOrderStorageById(createOrderDto);

    let stockTyreExistsUpdate = null;
      //let newReserveOilUpdate = 0;

    if (tyreStockUpdate) {
        // if (
        //   oilStock.remainder < createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        //   newReserveOilUpdate =
        //     createOrderDto.quantity -
        //     (createOrderDto.quantity - oilStock.remainder);
        //   stockOilExistsUpdate = oilStockUpdate;
        // } else if (
        //   oilStock.remainder >= createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
      stockTyreExistsUpdate = tyreStockUpdate;
        //} 
        //   else {
        //   throw new HttpException(
        //     `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
        //     HttpStatus.BAD_REQUEST,
        //   );
        // }
      }

    if (stockTyreExistsUpdate) {
      await stockTyreExistsUpdate.decrement('reserve', {
        by: createOrderDto.reserve,
      });

      //   await orderStorageIdOilUpdate.increment('reserve', {
      //   by: newReserveOilUpdate || createOrderDto.quantity,
      // });
      //const orderStorageIdTyreUpdate =
        await this.ordersStorageService.removeOrderStorageById(createOrderDto);
      }
      // await orderIdTyreUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      // await storageStorageTyreUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      
    //oilStock = null;
      await orderIdTyreUpdate.reload();
      return orderIdTyreUpdate;

    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async wheelStockUpdateOrder(createOrderDto: CreateOrderDto) {
    try {
      const orderIdWheelUpdate = await this.ordersRepository.findByPk(
        createOrderDto.id_order,
        { include: { all: true } },
      );

      const wheelStockUpdate = await this.stockWheelsService.findStockWheelById(
        createOrderDto,
      );
      const storageStorageWheelUpdate =
        await this.storageService.findStorageById(createOrderDto);
      // const orderStorageIdOilUpdate =
      //   await this.ordersStorageService.removeOrderStorageById(createOrderDto);

      let stockWheelExistsUpdate = null;
      //let newReserveOilUpdate = 0;

      if (wheelStockUpdate) {
        // if (
        //   oilStock.remainder < createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        //   newReserveOilUpdate =
        //     createOrderDto.quantity -
        //     (createOrderDto.quantity - oilStock.remainder);
        //   stockOilExistsUpdate = oilStockUpdate;
        // } else if (
        //   oilStock.remainder >= createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        stockWheelExistsUpdate = wheelStockUpdate;
        //} 
        //   else {
        //   throw new HttpException(
        //     `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
        //     HttpStatus.BAD_REQUEST,
        //   );
        // }
      }

      if (stockWheelExistsUpdate) {
        await stockWheelExistsUpdate.decrement('reserve', {
          by: createOrderDto.reserve,
        });

      //   await orderStorageIdOilUpdate.increment('reserve', {
      //   by: newReserveOilUpdate || createOrderDto.quantity,
      // });
      //const orderStorageIdWheelUpdate =
        await this.ordersStorageService.removeOrderStorageById(createOrderDto);
      }
      // await orderIdWheelUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      // await storageStorageWheelUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      
    //oilStock = null;
      await orderIdWheelUpdate.reload();
      return orderIdWheelUpdate;

    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async batteryStockUpdateOrder(createOrderDto: CreateOrderDto) {
    try {
      const orderIdBatteryUpdate = await this.ordersRepository.findByPk(
        createOrderDto.id_order,
        { include: { all: true } },
      );

      const batteryStockUpdate =
        await this.stockBatteriesService.findStockBatteryById(createOrderDto);
      const storageStorageBatteryUpdate =
        await this.storageService.findStorageById(createOrderDto);
      // const orderStorageIdOilUpdate =
      //   await this.ordersStorageService.removeOrderStorageById(createOrderDto);

      let stockBatteryExistsUpdate = null;
      //let newReserveOilUpdate = 0;

      if (batteryStockUpdate) {
        // if (
        //   oilStock.remainder < createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        //   newReserveOilUpdate =
        //     createOrderDto.quantity -
        //     (createOrderDto.quantity - oilStock.remainder);
        //   stockOilExistsUpdate = oilStockUpdate;
        // } else if (
        //   oilStock.remainder >= createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        stockBatteryExistsUpdate = batteryStockUpdate;
        //} 
        //   else {
        //   throw new HttpException(
        //     `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
        //     HttpStatus.BAD_REQUEST,
        //   );
        // }
      }

      if (stockBatteryExistsUpdate) {
        await stockBatteryExistsUpdate.decrement('reserve', {
          by: createOrderDto.reserve,
        });

      //   await orderStorageIdOilUpdate.increment('reserve', {
      //   by: newReserveOilUpdate || createOrderDto.quantity,
      // });
      //const orderStorageIdBatteryUpdate =
        await this.ordersStorageService.removeOrderStorageById(createOrderDto);
      }
      // await orderIdBatteryUpdate.$remove('order_storage', orderStorageIdBatteryUpdate);
      // await storageStorageBatteryUpdate.$remove('order_storage', orderStorageIdBatteryUpdate);
      
    //oilStock = null;
      await orderIdBatteryUpdate.reload();
      return orderIdBatteryUpdate;

    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async oilStockUpdateOrder(createOrderDto: CreateOrderDto) {
    try {
      const orderIdOilUpdate = await this.ordersRepository.findByPk(
        createOrderDto.id_order,
        { include: { all: true } },
      );

      const oilStockUpdate = await this.stockOilsService.findStockOilById(
        createOrderDto,
      );
      const storageStorageOilUpdate = await this.storageService.findStorageById(
        createOrderDto,
      );
      // const orderStorageIdOilUpdate =
      //   await this.ordersStorageService.removeOrderStorageById(createOrderDto);

      let stockOilExistsUpdate = null;
      //let newReserveOilUpdate = 0;

      if (oilStockUpdate) {
        // if (
        //   oilStock.remainder < createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        //   newReserveOilUpdate =
        //     createOrderDto.quantity -
        //     (createOrderDto.quantity - oilStock.remainder);
        //   stockOilExistsUpdate = oilStockUpdate;
        // } else if (
        //   oilStock.remainder >= createOrderDto.quantity &&
        //   oilStock.stock !== 0
        // ) {
        stockOilExistsUpdate = oilStockUpdate;
        //} 
        //   else {
        //   throw new HttpException(
        //     `Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`,
        //     HttpStatus.BAD_REQUEST,
        //   );
        // }
      }

      if (stockOilExistsUpdate) {
        await stockOilExistsUpdate.decrement('reserve', {
          by: createOrderDto.reserve,
        });

      //   await orderStorageIdOilUpdate.increment('reserve', {
      //   by: newReserveOilUpdate || createOrderDto.quantity,
      // });
      //const orderStorageIdOilUpdate =
        await this.ordersStorageService.removeOrderStorageById(createOrderDto);
      }
      // await orderIdOilUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      // await storageStorageOilUpdate.$remove('order_storage', orderStorageIdOilUpdate);
      
    //oilStock = null;
      await orderIdOilUpdate.reload();
      return orderIdOilUpdate;

    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateRemGoodsToOrder(createOrderDto: CreateOrderDto) {
    try {
      const tyreStockUpdate = await this.stockTyresService.findStockTyreById(
        createOrderDto,
      );
      const wheelStockUpdate = await this.stockWheelsService.findStockWheelById(
        createOrderDto,
      );
      const batteryStockUpdate =
        await this.stockBatteriesService.findStockBatteryById(createOrderDto);
      const oilStockUpdate = await this.stockOilsService.findStockOilById(
        createOrderDto,
      );

      if (tyreStockUpdate) {
        const orderUpdateTyre = await this.tyreStockUpdateOrder(createOrderDto);
        return orderUpdateTyre;
      }
  
      if (wheelStockUpdate) {
        const orderUpdateWheel = await this.wheelStockUpdateOrder(createOrderDto);
        return orderUpdateWheel;
      }
  
      if (batteryStockUpdate) {
        const orderUpdateBattery = await this.batteryStockUpdateOrder(createOrderDto);
        return orderUpdateBattery;
      }
  
      if (oilStockUpdate) {
        const orderUpdateOil = await this.oilStockUpdateOrder(createOrderDto);
        return orderUpdateOil;
      }

    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
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
