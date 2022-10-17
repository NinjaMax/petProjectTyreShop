import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockTyresDto } from './dto/create-stock_tyres.dto';
import { GetStockTyresDto } from './dto/get-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
//import { GetTyreDto } from '../tyres/dto/get-tyre.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
//import { Tyres } from 'src/tyres/entities/tyres.model';
import { SuppliersService } from '../suppliers/suppliers.service';


@Injectable()
export class StockService {

  constructor(@InjectModel(StockTyres) private stockTyresRepository: typeof StockTyres,
    private tyresService: TyresService, 
    private suppliersService : SuppliersService

   ) {}

  async createStock(createStockDto: CreateStockTyresDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createStockDto);
      
      if(tyres) {

        const stockCreate = await this.stockTyresRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto.id_sup);

        await tyres.$add('stock', [createStockDto.id_tyres]);
        //await tyres.$add('stock', [createStockDto.stock]);

        await supplier.$add('stock', [createStockDto.id_sup]);
        //await tyres.$add('stock', [createStockDto.update_date]);
        tyres.stock.push(stockCreate);

        supplier.stock.push(stockCreate);

        return tyres;

      }

      //return 'tyres is not exist';
      

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

  async update(id: number, updateStockDto: UpdateStockTyresDto) {
    
    try {

      return `This action updates a #${id} stock`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async remove(id: number) {
    
    try {

      return `This action removes a #${id} stock`;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
