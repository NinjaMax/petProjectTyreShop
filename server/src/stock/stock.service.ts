import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockTyresDto } from './dto/create-stock_tyres.dto';
import { GetStockTyresDto } from './dto/get-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';


@Injectable()
export class StockService {

  constructor(@InjectModel(StockTyres) private stockTyresRepository: typeof StockTyres,
    private tyresService: TyresService, 
    private suppliersService : SuppliersService

   ) {}

  async createStockTyres(createStockDto: CreateStockTyresDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createStockDto);
      
      if(tyres) {

        const stockCreate = await this.stockTyresRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await tyres.$add('stock', [createStockDto.id_tyres]);

        await supplier.$add('stock', [createStockDto.id_sup]);
        
        tyres.stock.push(stockCreate);

        supplier.stock.push(stockCreate);

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

  async findStockById(getStockTyresDto : GetStockTyresDto) {

    try {

      const stockbyId = await this.stockTyresRepository.findByPk(getStockTyresDto.id_tyres, {include: {all: true}});

      return stockbyId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockTyres(updateStockDto: UpdateStockTyresDto) {
    
    try {

      const tyresId = await this.stockTyresRepository.findByPk(updateStockDto.id_tyres, {include: {all: true}});
      
      if(tyresId) {

         await this.stockTyresRepository.update(
        { stock : updateStockDto.stock, 
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

  async removeStock(getStockTyresDto: GetStockTyresDto) {
    
    try {

      const removeStock = await this.stockTyresRepository.destroy({where: {id_tyres : getStockTyresDto.id_tyres}});

      return removeStock;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
