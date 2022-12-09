import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockWheels } from './entities/stock-wheels.model';
import { WheelsService } from 'src/wheels/wheels.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class StockWheelsService {

  constructor(@InjectModel(StockWheels) private stockWheelsRepository: typeof StockWheels,
    private wheelsService: WheelsService, 
    private suppliersService : SuppliersService,
    private storageService: StorageService 
   ) {}

  async createStockWheel(createStockDto: CreateStockDto) {

    try {

      const wheel = await this.wheelsService.findWheelById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if(wheel) {

        const stockCreate = await this.stockWheelsRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await storage.$add('stock_wheels', [stockCreate.id]);
        storage.stock_wheels.push(stockCreate);

        await wheel.$add('stock', [createStockDto.id]);

        await supplier.$add('stock_wheels', [createStockDto.id_supplier]);
        
        wheel.stock.push(stockCreate);

        supplier.stock_wheels.push(stockCreate);

        return wheel;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findAllStock() {

    try {

      const stockAllWheels = await this.stockWheelsRepository.findAll({include: {all: true}});

      return stockAllWheels;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockWheelById(getStockTyresDto : GetStockDto) {

    try {

      const stockWheelById = await this.stockWheelsRepository.findByPk(getStockTyresDto.id, {include: {all: true}});

      return stockWheelById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockWheel(updateStockDto: UpdateStockDto) {
    
    try {

      const wheelId = await this.stockWheelsRepository.findByPk(updateStockDto.id, {include: {all: true}});
      
      if(wheelId) {

        await this.stockWheelsRepository.update(
        {   stock : updateStockDto.stock,
            reserve : updateStockDto.reserve,
            remainder : updateStockDto.remainder,
            id_supplier : updateStockDto.id_supplier,
            update_date : updateStockDto.update_date
        }, {where: {id : updateStockDto.id}});

        const updateStockWheel = await this.stockWheelsRepository.findByPk(updateStockDto.id, {include: {all: true}});

        return updateStockWheel; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockWheel(getStockDto: GetStockDto) {
    
    try {

      const removeStockWheel = await this.stockWheelsRepository.destroy({where: {id: getStockDto.id}});

      return removeStockWheel;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
