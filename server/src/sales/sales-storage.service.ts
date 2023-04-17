import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { OrdersService } from '../orders/orders.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleStorage } from './entities/sales-storage.model';

@Injectable()
export class SalesStorageService {

  constructor(@InjectModel(SaleStorage) private salesStorageRepository: typeof SaleStorage,
    private ordersService: OrdersService
  ) {}

  async createOrderSupStorage(createSaleDto: CreateSaleDto) {
    
    try {
      
      const orderSup = await this.salesStorageRepository.create(createSaleDto);

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async createSalesStorageNew(
    
    id: number,
    id_order: number,
    id_supplier: number,
    quantity: number,
    price: number,
    sale_index: number,
    storage_index: number
    ) {
    
    try {
      
      const orderSup = await this.salesStorageRepository.create(
        { id, 
        id_order,
        id_supplier, 
        quantity,
        price,
        sale_index,
        storage_index
        },
        { fields: ['id','id_order', 'id_supplier',
         'quantity', 'price', 'sale_index'] }
        );

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllSalesStorage() {

    try {
      
      const salesStorageAll = await this.salesStorageRepository.findAll({include:{all: true}});

      return salesStorageAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllSalesStorageByOrd(getSaleDto: GetSaleDto) {

    try {
      
      const salesAllByOrder = await this.salesStorageRepository.findAll(
        {where: { id_order: getSaleDto.id_order }});

      return salesAllByOrder;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllSaleStorageBySale(getSaleDto: GetSaleDto) {

    try {
      
      const saleStorageBySale = await this.salesStorageRepository.findAll(
        { where: { id_sale: getSaleDto.id_sale }});

      return saleStorageBySale;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findSaleStorageById(getSaleDto: GetSaleDto) {

    try {
      
      const orderSupId = await this.salesStorageRepository.findByPk(getSaleDto.id_sales_storage, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async updateOrderStorage(updateSaleDto: UpdateSaleDto) {
    
    try {
        const orderStorageUpdate = await this.salesStorageRepository.update(
            {id: updateSaleDto.id,
            id_sale: updateSaleDto.id_sale,
            id_order: updateSaleDto.id_order,
            id_storage: updateSaleDto.id_storage, 
            quantity: updateSaleDto.quantity,
            price: updateSaleDto.price
            },{where:{id_sales_storage: updateSaleDto.id_sales_storage}}
        );

        return orderStorageUpdate;

    } catch {

        throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async removeOrderSupStorage(getSaleDto: GetSaleDto) {

    try {
      
      const orderSup = await this.salesStorageRepository.destroy({where: {id_sales_storage: getSaleDto.id_sales_storage}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}