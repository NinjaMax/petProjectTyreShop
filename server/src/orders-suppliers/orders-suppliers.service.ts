import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';
import { ContractService } from '../contract/contract.service';
import { OrdersStorageService } from '../orders/orders-storage.service';
import { OrdersService } from '../orders/orders.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
import { PriceTyresService } from '../prices/price-tyres.service';
import { PriceWheelsService } from '../prices/price-wheels.service';
import { PriceBatteryService } from '../prices/price-batteries.service';
import { PriceOilsService } from '../prices/price-oils.service';

@Injectable()
export class OrdersSuppliersService {
  constructor(
    @InjectModel(OrdersSupplier) 
    private ordersSupRepository: typeof OrdersSupplier,
    //private ordersService: OrdersService,
    private ordersSupStorageService: OrdersSupStorageService,
    private ordersStorageService: OrdersStorageService,
    private priceTyresService: PriceTyresService,
    private priceWheelsService: PriceWheelsService,
    private priceBatteryService: PriceBatteryService,
    private priceOilService: PriceOilsService,
    private stockTyresService: StockTyresService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    private stockWheelsService: StockWheelsService,
    private contractService: ContractService,
    private suppliersService: SuppliersService
  ) {}

  async createOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    //try {
      // const order = await this.ordersService.findOrderById(
      //   createOrdersSupplierDto
      // );
      // if (order) {
      //   const orderGoods =
      //     await this.ordersStorageService.findAllGoodsOrderStorage(
      //       createOrdersSupplierDto,
      //     );
      //   const ordersGoodsIdSup = orderGoods.map((item) => item.id_supplier);
      //   const idSuppliers = Array.from(new Set(ordersGoodsIdSup));

      //   for (let i = 0; i < idSuppliers.length; i++) {
      //     const getSupplier = await this.suppliersService.findSupplierByIdPrice(
      //       idSuppliers[i]
      //     );
      //     await this.ordersSupRepository.create(
      //       { ...createOrdersSupplierDto,
      //         id_order: order.id_order,
      //         id_supplier: getSupplier.id_supplier,
      //         id_contract: getSupplier.contract[0].id_contract,
      //       },
      //       // {
      //       //   fields: [
      //       //     'id_order',
      //       //     'id_supplier',
      //       //     'delivery',
      //       //     'status',
      //       //     'notes',
      //       //     'id_contract',
      //       //   ],
      //       // }
      //     );
      //   }
      //   const orderAllSupById = await this.ordersSupRepository.findAll({
      //     where: { id_order: order.id_order },
      //   });

      //   for (let j = 0; j < orderGoods.length; j++) {
      //     let orderSupindex = orderAllSupById.find(
      //       (item: any) => item.id_supplier === orderGoods[j].id_supplier,
      //     );
      //     await this.ordersSupStorageService.createOrderSupStorageNew(
      //       {
      //         id: orderGoods[j].id,
      //         id_order: orderGoods[j].id_order,
      //         id_supplier: orderGoods[j].id_supplier,
      //         quantity: orderGoods[j].quantity,
      //         price: orderGoods[j].price,
      //         storage_index: orderGoods[j].storage_index,
      //         price_wholesale: orderGoods[j].price_wholesale,
      //         total: orderGoods[j].total,
      //         id_storage: orderGoods[j].id_storage,
      //         id_order_sup: null,
      //         order_sup_index: orderSupindex.id_order_sup,
      //       }
      //       // orderGoods[j].id,
      //       // orderGoods[j].id_order,
      //       // orderGoods[j].id_supplier,
      //       // orderGoods[j].quantity,
      //       // orderGoods[j].price,
      //       // orderGoods[j].storage_index 
      //     );
      //   }
      //   const orderSupById = await this.ordersSupRepository.findOne({
      //     where: { id_order: order.id_order },
      //     include: [{ model: OrdersSupStorage }]
      //   });
      //   return orderSupById;  
      // } else {
        const orderSup = await this.ordersSupRepository.create(
          createOrdersSupplierDto
        );
        return orderSup;
      //}
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async createOrderSupGoods(createOrdersSupplierDto: CreateOrdersSupplierDto){
    try {
      const findOrderSupStorageGoods =
        await this.ordersSupStorageService.findOrderSupStorageById(
          createOrdersSupplierDto,
        );
      if (findOrderSupStorageGoods) {
        await this.ordersSupStorageService.updateOrderSupStorage(
          createOrdersSupplierDto,
        );
        await findOrderSupStorageGoods.reload();
        return findOrderSupStorageGoods;
      } else {
        const orderSupStorGoods =
          await this.ordersSupStorageService.createOrderSupStorage(
            createOrdersSupplierDto,
          );
        return orderSupStorGoods;
      };
    } catch (error) {
      throw new HttpException(
        `Data is incorrect and must be uniq ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addGoodsToOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    //try {
      const findByOrderSup =
        await this.ordersSupStorageService.findOrdersSupStorageByOrdSup(
          createOrdersSupplierDto,
        );
      const findAllByIdOrderSup =
        await this.ordersSupStorageService.findAllOrdersSupStorageByOrdSup(
          createOrdersSupplierDto,
        );
      if (findAllByIdOrderSup) {
        const orderSup = await this.ordersSupRepository.findByPk(
         createOrdersSupplierDto.order_sup_index,
        );

        for (let i = 0; i < findAllByIdOrderSup.length; i++) {
          await orderSup.$add('orders_sup_storage', findAllByIdOrderSup[i]);
          findAllByIdOrderSup[i].set('id_storage', findAllByIdOrderSup[i].storage_index);
          findAllByIdOrderSup[i].save();
        }
        await orderSup.reload();
        return orderSup;
       }
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async addGoodsToStock(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    try {
      const goodsOrderSup = 
        await this.ordersSupStorageService.findAllOrdersSupStorageByOrdSup(
          createOrdersSupplierDto,
        );
      const contractSupplier = await this.contractService.findContractById(
        createOrdersSupplierDto
      );

      for (let i = 0; i < goodsOrderSup.length; i++) {
        const tyresStock =
          await this.stockTyresService.findStockTyreByIdToAddStock(
            goodsOrderSup[i].id,
            goodsOrderSup[i].id_supplier,
          );
        const batteryStock =
          await this.stockBatteriesService.findStockBatteryByIdForSale(
            goodsOrderSup[i].id
          );
        const oilStock = await this.stockOilsService.findStockOilByIdForSale(
          goodsOrderSup[i].id,
        );
        const wheelsStock =
          await this.stockWheelsService.findStockWheelByIdForSale(
            goodsOrderSup[i].id
          );

        if (tyresStock) {
          await tyresStock.increment('stock', {
            by: goodsOrderSup[i].quantity,
          });
          await contractSupplier.decrement('balance', {
            by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity
          });
          //goodsOrderSup[i].id_storage = null;
          goodsOrderSup[i].save();
          await tyresStock.reload();
          await contractSupplier.reload();
          return tyresStock;
        } else if (!tyresStock) {
          const createNewTyreStock =
            await this.stockTyresService.createStockTyre(
              createOrdersSupplierDto,
            );
          return createNewTyreStock;
        }

        if (batteryStock) {
          await batteryStock.increment('stock', {
            by: goodsOrderSup[i].quantity 
          });
          await contractSupplier.decrement('balance', {
            by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity
          });
          goodsOrderSup[i].id_storage = null;
          goodsOrderSup[i].save();
          await batteryStock.reload();
          await contractSupplier.reload();
          return batteryStock;
        }

        if (oilStock) {
          await oilStock.increment('stock', {
            by: goodsOrderSup[i].quantity 
          });
          await contractSupplier.decrement('balance', {
            by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity
          });
          goodsOrderSup[i].id_storage = null;
          goodsOrderSup[i].save();
          await oilStock.reload();
          await contractSupplier.reload();
          return oilStock;
        }

        if (wheelsStock) {
          await wheelsStock.increment('stock', {
            by: goodsOrderSup[i].quantity 
          });
          await contractSupplier.decrement('balance', {
            by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity
          });
          goodsOrderSup[i].id_storage = null;
          goodsOrderSup[i].save();
          await wheelsStock.reload();
          await contractSupplier.reload();
          return wheelsStock;
        }   
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrdersSup() {
    try {  
      const orderSupAll = await this.ordersSupRepository.findAll({
        include: { all: true }
      });

      return orderSupAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderSupById(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {  
      const orderSupId = await this.ordersSupRepository.findByPk(
        getOrdersSupDto.id_order_sup, 
        { include: { all: true }}
      );
      return orderSupId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrderSupByIdOrder(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {  
      const allOrderSupIdOrder = await this.ordersSupRepository.findAll({
        where: { id_order: getOrdersSupDto.id_order },
        include: { all: true },
      });
      return allOrderSupIdOrder;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOrderSup(updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    //try {
      await this.ordersSupRepository.update(
        {
          id: updateOrdersSupplierDto.id,
          id_order_sup: updateOrdersSupplierDto.id_order_sup,
          storage: updateOrdersSupplierDto.storage,
          organisation: updateOrdersSupplierDto.organisation,
          total_cost: updateOrdersSupplierDto.total_cost,
          total_purchase_cost: updateOrdersSupplierDto.total_purchase_cost,
          delivery_cost: updateOrdersSupplierDto.delivery_cost,
          commission_cost: updateOrdersSupplierDto.commission_cost,
          status: updateOrdersSupplierDto.status,
          order_view: updateOrdersSupplierDto.order_view,
          delivery: updateOrdersSupplierDto.delivery,
          status_delivery: updateOrdersSupplierDto.status_delivery,
          delivery_ttn: updateOrdersSupplierDto.delivery_ttn,
          pay_view: updateOrdersSupplierDto.pay_view,
          status_pay: updateOrdersSupplierDto.status_pay,
          notes: updateOrdersSupplierDto.notes,
          id_supplier: updateOrdersSupplierDto.id_supplier,
          id_contract: updateOrdersSupplierDto.id_contract,
        },
        {
          where: {
            id_order_sup: updateOrdersSupplierDto.id_order_sup,
          },
        },
      );
      const updateOrdersSup = this.ordersSupRepository.findByPk(updateOrdersSupplierDto.id_order_sup);
      
      return updateOrdersSup;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async removeOrderSup(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {  
      const orderSup = await this.ordersSupRepository.destroy({
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

  async removeOrderSupStorage(getOrdersSupDto: GetOrdersSuppliersDto) {
    try {  
      const remOrderSupStorage =
        await this.ordersSupStorageService.removeOrderSupStorage(
          getOrdersSupDto,
      );
      return remOrderSupStorage;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
