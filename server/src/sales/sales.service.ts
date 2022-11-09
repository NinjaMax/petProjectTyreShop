import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StockBatteriesService } from 'src/stock/stock-batteries.service';
import { StockOilsService } from 'src/stock/stock-oils.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sales } from './entities/sale.model';

@Injectable()
export class SalesService {

  constructor(@InjectModel(Sales) private salesRepository: typeof Sales,
    private stockTyresService: StockTyresService,
    private stockWheelsService: StockWheelsService,
    private stockBatteriesService: StockBatteriesService,
    private stockOilsService: StockOilsService 
  ) {}

  async createSale(createSaleDto: CreateSaleDto) {

    try {

      const sale = await this.salesRepository.create(createSaleDto);
      
      const tyreStock = await this.stockTyresService.findStockTyreById(createSaleDto);
      const wheelStock = await this.stockWheelsService.findStockWheelById(createSaleDto);
      const batteryStock = await this.stockBatteriesService.findStockBatteryById(createSaleDto);
      const oilStock = await this.stockOilsService.findStockOilById(createSaleDto);
      
      if(tyreStock) {

        await tyreStock.decrement('stock', {by: createSaleDto.quantity});
        await tyreStock.reload();

        return sale;

      }

      if(wheelStock) {

        await wheelStock.decrement('stock', {by: createSaleDto.quantity});
        await wheelStock.reload();

        return sale;

      }

      if(batteryStock) {

        await batteryStock.decrement('stock', {by: createSaleDto.quantity});
        await batteryStock.reload();

        return sale;

      }

      if(oilStock) {

        await oilStock.decrement('stock', {by: createSaleDto.quantity});
        await oilStock.reload();

        return sale;

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
