import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock_tyres.dto';
import { GetStockDto } from './dto/get-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockBatteries } from './entities/stock-batteries.model';
import { BatteriesService } from 'src/batteries/batteries.service';

@Injectable()
export class StockBatteriesService {

  constructor(@InjectModel(StockBatteries) private stockBatteriesRepository: typeof StockBatteries,
    private batteriesService: BatteriesService, 
    private suppliersService : SuppliersService

   ) {}

  async createStockBattery(createStockDto: CreateStockDto) {

    try {

      const battery = await this.batteriesService.findBatteryById(createStockDto);
      
      if(battery) {

        const stockCreate = await this.stockBatteriesRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await battery.$add('stock', [createStockDto.id_battery]);

        await supplier.$add('stock_batteries', [createStockDto.id_sup]);
        
        battery.stock.push(stockCreate);

        supplier.stock_batteries.push(stockCreate);

        return battery;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findAllStock() {

    try {

      const stockAllBatteries = await this.stockBatteriesRepository.findAll({include: {all: true}});

      return stockAllBatteries;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockBatteryById(getStockTyresDto : GetStockDto) {

    try {

      const stockBatteryById = await this.stockBatteriesRepository.findByPk(getStockTyresDto.id_battery, {include: {all: true}});

      return stockBatteryById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockBattery(updateStockDto: UpdateStockTyresDto) {
    
    try {

      const batteryId = await this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, {include: {all: true}});
      
      if(batteryId) {

        await this.stockBatteriesRepository.update(
        { stock : updateStockDto.stock, 
          id_sup : updateStockDto.id_sup,
          update_date : updateStockDto.update_date
        }, {where: {id_battery : updateStockDto.id_battery}});

        const updateStockBatteries = await this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, {include: {all: true}});

        return updateStockBatteries; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockBattery(getStockDto: GetStockDto) {
    
    try {

      const removeStockBatteries = await this.stockBatteriesRepository.destroy({where: {id_battery : getStockDto.id_battery}});

      return removeStockBatteries;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
