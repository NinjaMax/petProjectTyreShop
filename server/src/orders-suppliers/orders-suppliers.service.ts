import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
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

@Injectable()
export class OrdersSuppliersService {

  constructor(@InjectModel(OrdersSupplier) private ordersSupRepository: typeof OrdersSupplier,
    private ordersService: OrdersService,
    private ordersSupStorageService: OrdersSupStorageService,
    private ordersStorageService: OrdersStorageService,
    private stockTyresService: StockTyresService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    private stockWheelsService: StockWheelsService,
    private contractService: ContractService
  ) {}

  async createOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      const order = await this.ordersService.findOrderById(createOrdersSupplierDto);

      if(order) {
        
        const orderGoods = await this.ordersStorageService.findAllGoodsOrderStorage(createOrdersSupplierDto);
        const ordersGoodsIdSup = orderGoods.map(item => item.id_supplier);
        const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
        
        for( let i = 0; i < idSuppliers.length; i++ ) {
          await this.ordersSupRepository.create(
           { id_order: order.id_order,
            id_supplier: idSuppliers[i],
            id_contract: 0 },
           { fields: ["id_order", "id_supplier", 
           "delivery", "status", "notes", "id_contract"] }
          );

        }
        
        for(let j = 0; j < orderGoods.length; j++) {

          await this.ordersSupStorageService.createOrderSupStorageNew(
            orderGoods[j].id,
            orderGoods[j].id_order,
            orderGoods[j].id_supplier,
            orderGoods[j].quantity,
            orderGoods[j].price,
            orderGoods[j].storage_index 
          );

        }

        const orderSupAll = await this.ordersSupRepository.findAll({include:{all: true}});
        return orderSupAll;  

      } else {

        const orderSup = await this.ordersSupRepository.create(createOrdersSupplierDto);

        return orderSup;

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async addGoodsToOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {

      const findByOrderSup = await this.ordersSupStorageService.
      findOrdersSupStorageByOrdSup(createOrdersSupplierDto);
      const findByIdOrder = await this.ordersSupStorageService.
      findAllOrdersSupStorageByOrd(createOrdersSupplierDto);

      if(findByOrderSup) {
        const orderSup = await this.ordersSupRepository.findByPk(
          createOrdersSupplierDto.id_order_sup);
        await orderSup.$add('orders_sup_storage', findByOrderSup);
        await findByOrderSup.$add('storage', findByOrderSup.storage_index);
        await orderSup.reload();
        
        return orderSup;

      }

      if(findByIdOrder) {

        const orderSupByOrder = await this.ordersSupRepository.
        findAll({where:{id_order: createOrdersSupplierDto.id_order}});
        const ordersGoodsIdSup = findByIdOrder.map(item => item.id_supplier);
        const idSuppliers = Array.from(new Set(ordersGoodsIdSup));

        for( let i = 0; i < idSuppliers.length; i++) {
          let orderSupStorageGoods = findByIdOrder.filter(
            item => item.id_supplier == idSuppliers[i]);
          let orderSup = await this.ordersSupRepository.findOne(
            {where:{id_supplier: idSuppliers[i]}} );

          await orderSup.$add('orders_sup_storage', orderSupStorageGoods);
          await orderSupStorageGoods[i].$add('storage', findByIdOrder[i].storage_index);
          
        }

        return orderSupByOrder;

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async addGoodsToStock(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {

      const goodsOrderSup = await this.ordersSupStorageService.
      findAllOrdersSupStorageByOrdSup(createOrdersSupplierDto);
      const contractSupplier = await this.contractService.findContractById(createOrdersSupplierDto);

        for(let i = 0; i < goodsOrderSup.length; i++) {

          let tyresStock = await this.stockTyresService.
          findStockTyreByIdForSale(goodsOrderSup[i].id);
          let batteryStock = await this.stockBatteriesService.
          findStockBatteryByIdForSale(goodsOrderSup[i].id);
          let oilStock = await this.stockOilsService.
          findStockOilByIdForSale(goodsOrderSup[i].id);
          let wheelsStock = await this.stockWheelsService.
          findStockWheelByIdForSale(goodsOrderSup[i].id);

          if(tyresStock) {
        
            await tyresStock.increment('stock', {by: goodsOrderSup[i].quantity });
            await contractSupplier.decrement('balance', 
            {by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity});
            goodsOrderSup[i].id_storage = null;
            goodsOrderSup[i].save();
            await tyresStock.reload();
            await contractSupplier.reload();
    
            return tyresStock;
    
          }

          if(batteryStock) {
        
            await batteryStock.increment('stock', {by: goodsOrderSup[i].quantity });
            await contractSupplier.decrement('balance', 
            {by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity});
            goodsOrderSup[i].id_storage = null;
            goodsOrderSup[i].save();
            await batteryStock.reload();
            await contractSupplier.reload();

            return batteryStock;
    
          }

          if(oilStock) {
        
            await oilStock.increment('stock', {by: goodsOrderSup[i].quantity });
            await contractSupplier.decrement('balance', 
            {by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity});
            goodsOrderSup[i].id_storage = null;
            goodsOrderSup[i].save();
            await oilStock.reload();
            await contractSupplier.reload();
    
            return oilStock;
    
          }

          if(wheelsStock) {
        
            await wheelsStock.increment('stock', {by: goodsOrderSup[i].quantity });
            await contractSupplier.decrement('balance', 
            {by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity});
            goodsOrderSup[i].id_storage = null;
            goodsOrderSup[i].save();
            await wheelsStock.reload();
            await contractSupplier.reload();
    
            return wheelsStock;
    
          }

          
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOrdersSup() {

    try {
      
      const orderSupAll = await this.ordersSupRepository.findAll({include:{all: true}});

      return orderSupAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOrderSupById(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSupId = await this.ordersSupRepository.findByPk(getOrdersSupDto.id_order_sup, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return `This action updates a #${id} ordersSupplier`;
  }

  async removeOrderSup(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSup = await this.ordersSupRepository.destroy({where: {id_order_sup: getOrdersSupDto.id_order_sup}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
