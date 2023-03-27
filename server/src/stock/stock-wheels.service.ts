import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockWheels } from './entities/stock-wheels.model';
import { WheelsService } from 'src/wheels/wheels.service';
import { StorageService } from 'src/storage/storage.service';
//import { ContractService } from 'src/contract/contract.service';
//import { OrdersSupStorageService } from 'src/orders-suppliers/orders-sup-storage.service';

@Injectable()
export class StockWheelsService {

  constructor(@InjectModel(StockWheels) private stockWheelsRepository: typeof StockWheels,
    private wheelsService: WheelsService, 
    private suppliersService : SuppliersService,
    private storageService: StorageService,
    //private ordersSupStorageService: OrdersSupStorageService,
    //private contractService: ContractService 
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

  async createStockWheelFromPrice(id: number, stock: number, 
    id_supplier: number, update_date: Date) {

    try {
      
      const [WheelStock, created] = await this.stockWheelsRepository.findOrCreate(
        {where:{id_wheel: +id, id_storage: 1}, 
        defaults:{
          id_wheel: +id,
          stock: +stock,
          id_supplier: +id_supplier,
          update_date: update_date
        }});

      if(!created) {

        await WheelStock.update(
          {stock: +stock, 
            id_supplier: +id_supplier,
            update_date: update_date}, 
          {where: {id_wheel: WheelStock.id_wheel, id_storage: 1}}
        );

        return WheelStock;
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
  
    }

  }

  // async createStockWheelByOrderSup(createStockDto: CreateStockDto) {

  //   try {

  //     const wheelsStock = await this.stockWheelsRepository.findByPk(createStockDto.id);
  //     const contractSupplier = await this.contractService.findContractById(createStockDto);
  //     const orderSupStorage = await this.ordersSupStorageService.
  //     findOrderSupStorageById(createStockDto);

  //     if(wheelsStock) {
        
  //       await wheelsStock.increment('stock', {by: orderSupStorage.quantity });
  //       await contractSupplier.decrement('balance', 
  //       {by: orderSupStorage.price_wholesale * orderSupStorage.quantity});
  //       orderSupStorage.id_storage = null;
  //       orderSupStorage.save();
  //       wheelsStock.reload();

  //       return wheelsStock;

  //     }

  //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

  //   } catch {

  //     throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
  //   }
    
  // }

  async findAllStock() {

    try {

      const stockAllWheels = await this.stockWheelsRepository.findAll({include: {all: true}});

      return stockAllWheels;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockWheelByIdWheel(getStockDto: GetStockDto) {

    try {

      const stockWheelById = await this.stockWheelsRepository.findOne(
        {where: {id_wheel: getStockDto.id_wheel}, 
        include: {all: true}
      });

      return stockWheelById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockWheelById(getStockDto: GetStockDto) {

    try {

      const stockWheelById = await this.stockWheelsRepository.findOne(
        {where: {id_wheel: getStockDto.id}, 
        //include: {all: true}
      });

      return stockWheelById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async findStockWheelByIdForSale(id_wheel: number) {

    try {

      const stockWheelId = await this.stockWheelsRepository.findByPk(id_wheel, {include: {all: true}});

      return stockWheelId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updateStockWheel(updateStockDto: UpdateStockDto) {
    
    try {

      const wheelIdUpdate = await this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, {include: {all: true}});
      
      if(wheelIdUpdate) {

        await this.stockWheelsRepository.update(
        { stock: updateStockDto.stock,
            reserve: updateStockDto.reserve,
            remainder: updateStockDto.remainder,
            id_supplier: updateStockDto.id_supplier,
            update_date: updateStockDto.update_date
        }, {where: {id_wheel: updateStockDto.id_wheel}});

        const updateStockWheel = await this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, {include: {all: true}});

        return updateStockWheel; 
      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeStockWheel(getStockDto: GetStockDto) {
    
    try {

      const removeStockWheel = await this.stockWheelsRepository.destroy({where: {id_wheel: getStockDto.id_wheel}});

      return removeStockWheel;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
