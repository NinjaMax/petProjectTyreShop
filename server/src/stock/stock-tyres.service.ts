import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StorageService } from '../storage/storage.service';
//import { OrdersSuppliersService } from 'src/orders-suppliers/orders-suppliers.service';
//import { OrdersSupStorageService } from 'src/orders-suppliers/orders-sup-storage.service';
//import { ContractService } from 'src/contract/contract.service';

@Injectable()
export class StockTyresService {
  constructor(
    @InjectModel(StockTyres) private stockTyresRepository: typeof StockTyres,
    private tyresService: TyresService,
    private suppliersService: SuppliersService,
    private storageService: StorageService,
  ) //private ordersSupStorageService: OrdersSupStorageService,
  //private contracService: ContractService
  {}

  async createStockTyre(createStockDto: CreateStockDto) {
    try {
      const tyres = await this.tyresService.findTyresById(createStockDto);
      const storage = await this.storageService.findStorageById(createStockDto);

      if (tyres) {
        const stockCreate = await this.stockTyresRepository.create(
          createStockDto,
        );

        const supplier = await this.suppliersService.findSupplierById(
          createStockDto,
        );
        await storage.$add('stock_tyres', [stockCreate.id]);
        storage.stock_tyres.push(stockCreate);
        await tyres.$add('stock', [createStockDto.id]);
        await supplier.$add('stock_tyres', [createStockDto.id_supplier]);
        tyres.stock.push(stockCreate);
        supplier.stock_tyres.push(stockCreate);

        return tyres;
      } else {
        return null;
      }
      //throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createStockTyreFromPrice(
    id: number,
    stock: number,
    id_supplier: number,
    update_date: Date,
  ) {
    try {
      const [tyreStock, created] = await this.stockTyresRepository.findOrCreate(
        {
          where: { id_tyre: +id, id_storage: 1 },
          defaults: {
            id_tyre: +id,
            stock: +stock,
            id_supplier: +id_supplier,
            update_date: update_date,
          },
        },
      );

      if (!created) {
        await tyreStock.update(
          {
            stock: +stock,
            id_supplier: +id_supplier,
            update_date: update_date,
          },
          { where: { id_tyre: tyreStock.id_tyre, id_storage: 1 } },
        );

        return tyreStock;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
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
      const stockAll = await this.stockTyresRepository.findAll({
        include: { all: true },
      });

      return stockAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStockTyreByIdtyre(getStockDto: GetStockDto) {
    try {
      const stockTyreById = await this.stockTyresRepository.findOne({
        where: { id_tyre: getStockDto.id_tyre },
        include: { all: true },
      });

      return stockTyreById;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAdminStockTyreByIdtyre(id_tyre: number) {
    try {
      const stockAdminTyreById = await this.stockTyresRepository.findAll({
        where: { id_tyre: id_tyre },
        include: { all: true },
      });

      return stockAdminTyreById;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStockTyreById(getStockDto: GetStockDto) {
    try {
      const stockTyreById = await this.stockTyresRepository.findOne({
        where: { id_tyre: getStockDto.id },
        //include: {all: true}
      });

      return stockTyreById;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStockTyreParamId(id_tyre: number) {
    try {
      const stockTyreByParamId = await this.stockTyresRepository.findByPk(
        id_tyre,
        { include: { all: true } },
      );

      return stockTyreByParamId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStockTyreByIdForSale(id_tyre: number) {
    try {
      const stockTyreId = await this.stockTyresRepository.findByPk(id_tyre, {
        include: { all: true },
      });

      return stockTyreId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStockTyreByIdToAddStock(id_tyre: number, id_supplier: number) {
    try {
      const stockTyreId = await this.stockTyresRepository.findOne({
        where: { id_tyre: id_tyre, id_supplier: id_supplier },
        include: { all: true },
      });

      return stockTyreId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateStockTyres(updateStockDto: UpdateStockDto) {
    try {
      const tyresIdUpdate = await this.stockTyresRepository.findByPk(
        updateStockDto.id_tyre,
        { include: { all: true } },
      );

      if (tyresIdUpdate) {
        await this.stockTyresRepository.update(
          {
            stock: updateStockDto.stock,
            reserve: updateStockDto.reserve,
            remainder: updateStockDto.remainder,
            id_supplier: updateStockDto.id_supplier,
            update_date: updateStockDto.update_date,
          },
          { where: { id_tyre: updateStockDto.id_tyre } },
        );

        const updateStockTyres = await this.stockTyresRepository.findByPk(
          updateStockDto.id_tyre,
          { include: { all: true } },
        );

        return updateStockTyres;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeStockTyre(getStockDto: GetStockDto) {
    try {
      const removeStockTyre = await this.stockTyresRepository.destroy({
        where: { id_tyre: getStockDto.id_tyre },
      });

      return removeStockTyre;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
