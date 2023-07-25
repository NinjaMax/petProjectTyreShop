import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sales } from './entities/sale.model';
import { SalesStorageService } from './sales-storage.service';
import { ContractService } from '../contract/contract.service';
import { OrdersStorageService } from '../orders/orders-storage.service';
import { OrdersService } from '../orders/orders.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';

@Injectable()
export class SalesService {

  constructor(
    @InjectModel(Sales) private salesRepository: typeof Sales,
    private ordersService: OrdersService,
    private ordersStorageService: OrdersStorageService,
    private salesStorageService: SalesStorageService,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService,
    private contractService: ContractService
  ) {}
  
  async createSale(createSaleDto: CreateSaleDto) {

    try {

      const order = await this.ordersService.findOrderById(createSaleDto);

      if(order) {
        
        const orderStorageGoods = await this.ordersStorageService.
        findAllGoodsOrderStorage(createSaleDto);
        //const ordersGoodsIdSup = orderStorageGoods.map(item => item.id_supplier);
        //const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
        
        const newSale = await this.salesRepository.create(
          {
            id_order: order.id_order,
            delivery: order.delivery,
            id_user: order.id_user,
            notes: order.notes,
            bonus_decrease: order.bonus_decrease,
            },
           { fields: ["id_order", "delivery", "id_user", 
            "notes"] }
          );
        
        for(let j = 0; j < orderStorageGoods.length; j++) {

          await this.salesStorageService.createSalesStorageNew(
            orderStorageGoods[j].id,
            orderStorageGoods[j].id_order,
            orderStorageGoods[j].id_supplier,
            orderStorageGoods[j].quantity,
            orderStorageGoods[j].price,
            newSale.id_sale,
            orderStorageGoods[j].id_storage
          );

        }

        return newSale;

      } else {

        const sale = await this.salesRepository.create(createSaleDto);
      
        return sale; 
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  async addGoodsSale(createSaleDto: CreateSaleDto) {

    try {

      const findSale = await this.salesRepository.findByPk(createSaleDto.id_sale);
      const findSalesStorage = await this.salesStorageService.
      findAllSalesStorageByOrd(createSaleDto);
      const contractCustomer = await this.contractService.
      findContractById(createSaleDto);

      if(findSale || findSalesStorage) { 
        for( let i = 0; i < findSalesStorage.length; i++) {

          let tyreStock = await this.stockTyresService.
          findStockTyreByIdForSale(findSalesStorage[i].id);
          let wheelStock = await this.stockWheelsService.
          findStockWheelByIdForSale(findSalesStorage[i].id);
          let batteryStock = await this.stockBatteriesService.
          findStockBatteryByIdForSale(findSalesStorage[i].id);
          let oilStock = await this.stockOilsService.
          findStockOilByIdForSale(findSalesStorage[i].id);
          

          findSalesStorage[i].id_storage = findSalesStorage[i].storage_index;
          await findSale.$add('sales_storage', findSalesStorage[i]);
          
          await contractCustomer.decrement('balance', {by: findSalesStorage[i].total });
          await contractCustomer.increment('bonus', {
            by: findSalesStorage[i].total > 20000 ? findSalesStorage[i].total * 0.01 : 
            findSalesStorage[i].total * 0.02
          });
          await contractCustomer.reload();
      
          if(tyreStock) {
            await tyreStock.decrement(['stock','reserve'], {by: createSaleDto.quantity});
            await tyreStock.reload();  
          }
          if(wheelStock) {
            await wheelStock.decrement(['stock','reserve'], {by: createSaleDto.quantity});
            await wheelStock.reload();
          }
          if(batteryStock) {
            await batteryStock.decrement(['stock', 'reserve'], {by: createSaleDto.quantity});
            await batteryStock.reload();
          }
          if(oilStock) {
            await oilStock.decrement(['stock', 'reserve'], {by: createSaleDto.quantity});
            await oilStock.reload(); 
          }
        }
        if (findSale.bonus_decrease) {
          await contractCustomer.increment('balance', {by: findSale.bonus_decrease });
          await contractCustomer.decrement('bonus', {by: findSale.bonus_decrease });
        }
        
        return findSale;
      } else {
        return "ORDER DOESN'T EXIST";
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  async findAllSales() {

    try {

      const saleAll = await this.salesRepository.findAll({include: {all: true}});

      return saleAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  async findSaleById(getSaleDto: GetSaleDto) {

    try {

      const saleById = await this.salesRepository.findByPk(getSaleDto.id_sale, {include: {all: true}});

      return saleById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  async removeSale(getSaleDto: GetSaleDto) {

    try {

      const removeSale = await this.salesRepository.destroy({where: {id_sale : getSaleDto.id_sale}});

      return removeSale;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }
}
