import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockOils } from './entities/stock-oils.model';
import { OilsService } from '../oils/oils.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class StockOilsService {

  constructor(@InjectModel(StockOils) private stockOilsRepository: typeof StockOils,
    private oilsService: OilsService, 
    private suppliersService: SuppliersService,
    private storageService: StorageService
    //private ordersSupStorageService: OrdersSupStorageService,
    //private contractService: ContractService

   ) {}

  async createStockOils(createStockDto: CreateStockDto) {

    try {

      const oil = await this.oilsService.findOilById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if (oil) {

        const stockCreate = await this.stockOilsRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await storage.$add('stock_oils', [stockCreate.id]);
        storage.stock_oils.push(stockCreate);

        await oil.$add('stock', [createStockDto.id]);

        await supplier.$add('stock_oils', [createStockDto.id_supplier]);
        
     oil.stock.push(stockCreate);

        supplier.stock_oils.push(stockCreate);

        return oil;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  // async createStockOilByOrderSup(createStockDto: CreateStockDto) {

  //   try {

  //     const oilStock = await this.stockOilsRepository.findByPk(createStockDto.id);
  //     const contractSupplier = await this.contractService.findContractById(createStockDto);
  //     const orderSupStorage = await this.ordersSupStorageService.
  //     findOrderSupStorageById(createStockDto);

  //     if(oilStock) {
        
  //       await oilStock.increment('stock', {by: orderSupStorage.quantity });
  //       await contractSupplier.decrement('balance', 
  //       {by: orderSupStorage.price_wholesale * orderSupStorage.quantity});
  //       orderSupStorage.id_storage = null;
  //       orderSupStorage.save();
  //       oilStock.reload();

  //       return oilStock;

  //     }

  //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

  //   } catch {

  //     throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
  //   }
    
  // }

  async findAllStock() {

    try {

      const stockAllOils = await this.stockOilsRepository.findAll({include: {all: true}});

      return stockAllOils;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockOilByIdOil(getStockDto: GetStockDto) {

    try {

      const stockOilById = await this.stockOilsRepository.findOne(
        {where: {id_oil: getStockDto.id_oil}, 
        include: {all: true}
      });

      return stockOilById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockOilById(getStockDto: GetStockDto) {

    try {

      const stockOilById = await this.stockOilsRepository.findOne(
        {where: {id_oil: getStockDto.id}, 
        //include: {all: true}
      });

      return stockOilById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockOilByIdForSale(id_oil : number) {

    try {

      const stockOilId = await this.stockOilsRepository.findByPk(id_oil, {include: {all: true}});

      return stockOilId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockOil(updateStockDto: UpdateStockDto) {
    
    try {

      const oilIdUpdate = await this.stockOilsRepository.findByPk(updateStockDto.id_oil, {include: {all: true}});
      
      if(oilIdUpdate) {

        await this.stockOilsRepository.update(
        {   
            stock: updateStockDto.stock, 
            reserve: updateStockDto.reserve,
            remainder: updateStockDto.remainder,
            id_supplier: updateStockDto.id_supplier,
            update_date: updateStockDto.update_date
        }, {where: {id_oil: updateStockDto.id_oil}});

        const updateStockOils = await this.stockOilsRepository.findByPk(updateStockDto.id_oil, {include: {all: true}});

        return updateStockOils; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockOil(getStockDto: GetStockDto) {
    
    try {

      const removeStockOils = await this.stockOilsRepository.destroy({where: {id_oil: getStockDto.id_oil}});

      return removeStockOils;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
