import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StorageService } from 'src/storage/storage.service';
//import { OrdersSuppliersService } from 'src/orders-suppliers/orders-suppliers.service';
//import { OrdersSupStorageService } from 'src/orders-suppliers/orders-sup-storage.service';
//import { ContractService } from 'src/contract/contract.service';


@Injectable()
export class StockTyresService {

  constructor(@InjectModel(StockTyres) private stockTyresRepository: typeof StockTyres,
    private tyresService: TyresService, 
    private suppliersService : SuppliersService,
    private storageService: StorageService,
    //private ordersSupStorageService: OrdersSupStorageService,
    //private contracService: ContractService
   ) {}

  async createStockTyre(createStockDto: CreateStockDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if(tyres) {

        const stockCreate = await this.stockTyresRepository.create(createStockDto);
        
        const supplier = await this.suppliersService.findSupplierById(createStockDto);
        
        await storage.$add('stock_tyres', [stockCreate.id]);
        storage.stock_tyres.push(stockCreate);

        await tyres.$add('stock', [createStockDto.id]);

        await supplier.$add('stock_tyres', [createStockDto.id_supplier]);
        
        tyres.stock.push(stockCreate);

        supplier.stock_tyres.push(stockCreate);

        return tyres;

      }

      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async createStockTyreFromPrice(id: number, stock: number, 
    id_supplier: number) {

    try {

      const tyreId = await this.tyresService.findTyresByIdPrice(id);
      const tyreStock = await this.stockTyresRepository.findByPk(id);
      const supplier = await this.suppliersService.findSupplierByIdPrice(
        id_supplier);

      if(tyreStock.id_supplier == supplier.id) {

        const updateStock = await this.stockTyresRepository.update({
          stock: stock, id_supplier: supplier.id}, 
          {where: {id: tyreStock.id}});
        //await tyreId.$set('stock', updateStock);
        //tyreId.country = tyreCountry;
        //updateCountry.reload();

        return updateStock;

      } else {

        const newTyreStock = await this.stockTyresRepository.create(
          {id, stock, id_supplier});
        await supplier.$add('stock_tyres', [supplier.id_supplier]);
        //await tyreId.$add('stock', newTyreStock);
        //tyreId.country = tyreCountry;
        //tyreCountry.reload();

        return newTyreStock;

      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
  
    }

  }

  // async createStockTyreByOrderSup(createStockDto: CreateStockDto) {

  //   try {

  //     const tyresStock = await this.stockTyresRepository.findByPk(createStockDto.id);
  //     const contractSupplier = await this.contracService.findContractById(createStockDto);
  //     const orderSupStorage = await this.ordersSupStorageService.
  //     findOrderSupStorageById(createStockDto);

  //     if(tyresStock) {
        
  //       await tyresStock.increment('stock', {by: orderSupStorage.quantity });
  //       await contractSupplier.decrement('balance', 
  //       {by: orderSupStorage.price_wholesale * orderSupStorage.quantity});
  //       orderSupStorage.id_storage = null;
  //       orderSupStorage.save();
  //       tyresStock.reload();

  //       return tyresStock;

  //     }

  //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

  //   } catch {

  //     throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
  //   }
    
  // }

  async findAllStock() {

    try {

      const stockAll = await this.stockTyresRepository.findAll({include: {all: true}});

      return stockAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockTyreById(getStockDto : GetStockDto) {

    try {

      const stockTyreById = await this.stockTyresRepository.findByPk(getStockDto.id, {include: {all: true}});

      return stockTyreById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockTyreByIdForSale(id : number) {

    try {

      const stockTyreById = await this.stockTyresRepository.findByPk(id, {include: {all: true}});

      return stockTyreById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockTyres(updateStockDto: UpdateStockDto) {
    
    try {

      const tyresId = await this.stockTyresRepository.findByPk(updateStockDto.id, {include: {all: true}});
      
      if(tyresId) {

        await this.stockTyresRepository.update(
        { stock : updateStockDto.stock,
          reserve : updateStockDto.reserve,
          remainder : updateStockDto.remainder,
          id_supplier : updateStockDto.id_supplier,
          update_date : updateStockDto.update_date
        }, {where: {id : updateStockDto.id}});

        const updateStockTyres = await this.stockTyresRepository.findByPk(updateStockDto.id, {include: {all: true}});

        return updateStockTyres; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockTyre(getStockDto: GetStockDto) {
    
    try {

      const removeStockTyre = await this.stockTyresRepository.destroy({where: {id : getStockDto.id}});

      return removeStockTyre;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
