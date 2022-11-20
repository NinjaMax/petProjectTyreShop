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

        const salesId = await this.salesRepository.findByPk(sale.id_sale);

        await tyreStock.decrement(['stock','reserve'], {by: createSaleDto.quantity});
        await salesId.$add('storage', [tyreStock.storage]);
        salesId.storage.push(tyreStock.storage);
        await tyreStock.reload();

        return sale;

      }

      if(wheelStock) {

        const salesId = await this.salesRepository.findByPk(sale.id_sale);

        await wheelStock.decrement(['stock','reserve'], {by: createSaleDto.quantity});
        await salesId.$add('storage', [wheelStock.storage]);
        salesId.storage.push(wheelStock.storage);
        await wheelStock.reload();

        return sale;

      }

      if(batteryStock) {

        const salesId = await this.salesRepository.findByPk(sale.id_sale);

        await batteryStock.decrement(['stock', 'reserve'], {by: createSaleDto.quantity});
        await salesId.$add('storage', [batteryStock.storage]);
        salesId.storage.push(batteryStock.storage);
        await batteryStock.reload();

        return sale;

      }

      if(oilStock) {

        const salesId = await this.salesRepository.findByPk(sale.id_sale);

        await oilStock.decrement(['stock', 'reserve'], {by: createSaleDto.quantity});
        await salesId.$add('storage', [oilStock.storage]);
        salesId.storage.push(oilStock.storage);
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
