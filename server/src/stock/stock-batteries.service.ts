import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockBatteries } from './entities/stock-batteries.model';
import { StorageService } from '../storage/storage.service';
import { BatteriesService } from '../batteries/batteries.service';


@Injectable()
export class StockBatteriesService {

  constructor(
    @InjectModel(StockBatteries)
    private stockBatteriesRepository: typeof StockBatteries,
    private batteriesService: BatteriesService, 
    private suppliersService: SuppliersService,
    private storageService: StorageService,
    //private ordersSupStorageService: OrdersSupStorageService,
    //private contractService: ContractService

   ) {}

  async createStockBattery(createStockDto: CreateStockDto) {

    try {

      const battery = await this.batteriesService.findBatteryById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if(battery) {

        const stockCreate = await this.stockBatteriesRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await storage.$add('stock_batteries', [stockCreate.id]);
        storage.stock_batteries.push(stockCreate);

        await battery.$add('stock', [createStockDto.id]);

        await supplier.$add('stock_batteries', [createStockDto.id_supplier]);
        
        battery.stock.push(stockCreate);

        supplier.stock_batteries.push(stockCreate);

        return battery;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  // async createStockBatteryByOrderSup(createStockDto: CreateStockDto) {

  //   try {

  //     const batteryStock = await this.stockBatteriesRepository.findByPk(createStockDto.id);
  //     const contractSupplier = await this.contractService.findContractById(createStockDto);
  //     const orderSupStorage = await this.ordersSupStorageService.
  //     findOrderSupStorageById(createStockDto);

  //     if(batteryStock) {
        
  //       await batteryStock.increment('stock', {by: orderSupStorage.quantity });
  //       await contractSupplier.decrement('balance', 
  //       {by: orderSupStorage.price_wholesale * orderSupStorage.quantity});
  //       orderSupStorage.id_storage = null;
  //       orderSupStorage.save();
  //       batteryStock.reload();

  //       return batteryStock;

  //     }

  //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

  //   } catch {

  //     throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
  //   }
    
  // }

  async findAllStock() {

    try {

      const stockAllBatteries = await this.stockBatteriesRepository.findAll({include: {all: true}});

      return stockAllBatteries;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockBatteryByIdBattery(getStockDto: GetStockDto) {

    try {

      const stockBatteryById = await this.stockBatteriesRepository.findOne(
        {where: {id_battery: getStockDto.id_battery}, 
        include: {all: true}
      });

      return stockBatteryById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockBatteryById(getStockDto: GetStockDto) {

    try {

      const stockBatteryById = await this.stockBatteriesRepository.findOne(
        {where: {id_battery: getStockDto.id}, 
        //include: {all: true}
      });

      return stockBatteryById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockBatteryByIdForSale(id_battery: number) {

    try {

      const stockBatteryId = await this.stockBatteriesRepository.findByPk(id_battery, {include: {all: true}});

      return stockBatteryId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockBattery(updateStockDto: UpdateStockDto) {
    
    try {

      const batteryIdUpdate = await this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, {include: {all: true}});
      
      if(batteryIdUpdate) {

        await this.stockBatteriesRepository.update(
        { 
            stock: updateStockDto.stock,
            reserve: updateStockDto.reserve,
            remainder: updateStockDto.remainder, 
            id_supplier: updateStockDto.id_supplier,
            update_date: updateStockDto.update_date
        }, {where: {id_battery: updateStockDto.id_battery}});

        const updateStockBatteries = await this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, {include: {all: true}});

        return updateStockBatteries; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockBattery(getStockDto: GetStockDto) {
    
    try {

      const removeStockBatteries = await this.stockBatteriesRepository.destroy({where: {id_battery: getStockDto.id_battery}});

      return removeStockBatteries;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
