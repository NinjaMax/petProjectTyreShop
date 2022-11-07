import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockWheels } from './entities/stock-wheels.model';
import { WheelsService } from 'src/wheels/wheels.service';

@Injectable()
export class StockWheelsService {

  constructor(@InjectModel(StockWheels) private stockWheelsRepository: typeof StockWheels,
    private wheelsService: WheelsService, 
    private suppliersService : SuppliersService

   ) {}

  async createStockWheel(createStockDto: CreateStockDto) {

    try {

      const wheel = await this.wheelsService.findWheelById(createStockDto);
      
      if(wheel) {

        const stockCreate = await this.stockWheelsRepository.create(createStockDto);

        const supplier = await this.suppliersService.findSupplierById(createStockDto);

        await wheel.$add('stock', [createStockDto.id_wheel]);

        await supplier.$add('stock_wheels', [createStockDto.id_sup]);
        
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

      const stockWheelById = await this.stockWheelsRepository.findByPk(getStockTyresDto.id_wheel, {include: {all: true}});

      return stockWheelById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockWheel(updateStockDto: UpdateStockDto) {
    
    try {

      const wheelId = await this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, {include: {all: true}});
      
      if(wheelId) {

        await this.stockWheelsRepository.update(
        { stock : updateStockDto.stock, 
          id_sup : updateStockDto.id_sup,
          update_date : updateStockDto.update_date
        }, {where: {id_wheel : updateStockDto.id_wheel}});

        const updateStockWheel = await this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, {include: {all: true}});

        return updateStockWheel; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockWheel(getStockDto: GetStockDto) {
    
    try {

      const removeStockWheel = await this.stockWheelsRepository.destroy({where: {id_wheel : getStockDto.id_wheel}});

      return removeStockWheel;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
