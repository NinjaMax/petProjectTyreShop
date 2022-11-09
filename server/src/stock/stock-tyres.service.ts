import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StorageService } from 'src/storage/storage.service';


@Injectable()
export class StockTyresService {

  constructor(@InjectModel(StockTyres) private stockTyresRepository: typeof StockTyres,
    private tyresService: TyresService, 
    private suppliersService : SuppliersService,
    private storageService: StorageService
   ) {}

  async createStockTyre(createStockDto: CreateStockDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if(tyres) {

        const stockCreate = await this.stockTyresRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);
        
        await storage.$add('stock_tyres', [stockCreate.id_tyres]);
        storage.stock_tyres.push(stockCreate);

        await tyres.$add('stock', [createStockDto.id_tyres]);

        await supplier.$add('stock', [createStockDto.id_sup]);
        
        tyres.stock.push(stockCreate);

        supplier.stock_tyres.push(stockCreate);

        return tyres;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findAllStock() {

    try {

      const stockAll = await this.stockTyresRepository.findAll({include: {all: true}});

      return stockAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockTyreById(getStockTyresDto : GetStockDto) {

    try {

      const stockTyreById = await this.stockTyresRepository.findByPk(getStockTyresDto.id_tyres, {include: {all: true}});

      return stockTyreById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockTyres(updateStockDto: UpdateStockDto) {
    
    try {

      const tyresId = await this.stockTyresRepository.findByPk(updateStockDto.id_tyres, {include: {all: true}});
      
      if(tyresId) {

        await this.stockTyresRepository.update(
        { stock : updateStockDto.stock,
          reserve : updateStockDto.reserve,
          remainder : updateStockDto.remainder,
          id_sup : updateStockDto.id_sup,
          update_date : updateStockDto.update_date
        }, {where: {id_tyres : updateStockDto.id_tyres}});

        const updateStockTyres = await this.stockTyresRepository.findByPk(updateStockDto.id_tyres, {include: {all: true}});

        return updateStockTyres; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockTyre(getStockDto: GetStockDto) {
    
    try {

      const removeStockTyre = await this.stockTyresRepository.destroy({where: {id_tyres : getStockDto.id_tyres}});

      return removeStockTyre;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
