import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceWheels } from './entities/price-wheels.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { WheelsService } from '../wheels/wheels.service';

@Injectable()
export class PriceWheelsService {

  constructor(@InjectModel(PriceWheels) private priceWheelsRepository: typeof PriceWheels,
    private wheelsService: WheelsService, 
    private suppliersService: SuppliersService,
    private storageService: StorageService 
  ) {}

  async createPriceWheels(createPriceDto: CreatePriceDto) {
    try {
      const wheel = await this.wheelsService.findWheelById(createPriceDto);
      const storage = await this.storageService.findStorageById(createPriceDto);
      if(wheel) {
        const priceCreate = await this.priceWheelsRepository.create(createPriceDto);
        const supplier = await this.suppliersService.findSupplierById(createPriceDto);     
        await storage.$add('price_wheels', [priceCreate.id]);
        storage.price_wheels.push(priceCreate);
        await wheel.$add('price', [createPriceDto.id_wheel]);  
        await supplier.$add('price', [createPriceDto.id_supplier]);
        wheel.price.push(priceCreate);
        supplier.price_wheels.push(priceCreate);
        return wheel;
      }
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async createPriceWheelsFromPrice(
    id: number,
    price_wholesale: number,
    price: number,
    delivery_price: number,
    price_plus_delivery: number,
    id_supplier: number,
    update_date: Date
    ) {
    try {
      const [priceByWheelId, created] = await this.priceWheelsRepository.findOrCreate(
        {where: {id_wheel: +id, id_storage: 1}, 
        defaults:{
          id_wheel: +id,
          price_wholesale: +price_wholesale,
          price: +price,
          delivery_price: +delivery_price,
          price_plus_delivery: +price_plus_delivery,
          id_supplier: +id_supplier,
          update_date: update_date
        }});
      if(!created) {
        await priceByWheelId.update({
          price_wholesale: +price_wholesale,
          price: +price,
          delivery_price: +delivery_price,
          price_plus_delivery: +price_plus_delivery,
          id_supplier: +id_supplier,
          update_date: update_date}, 
        {where:{id_wheel: priceByWheelId.id_wheel, id_storage: 1}});
        return priceByWheelId;
      } 
    } catch (error) {
      throw new HttpException(`${error.message}` + ' Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllWheels() {
    try {
      const priceWheelsAll = await this.priceWheelsRepository.findAll({include: {all: true}});
      return priceWheelsAll;
    } catch (error) {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findPriceWheelsById(getPriceDto: GetPriceDto) {
    try {
      const wheelsPriceById = await this.priceWheelsRepository.findOne(
        {where: {id_wheel: getPriceDto.id_wheel}, 
        include: {all: true}
      });
      return wheelsPriceById;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async updatePriceWheels(updatePriceDto: UpdatePriceTyresDto ) {
    try {
      const wheelsPriceId = await this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, {include: {all: true}});
      if(wheelsPriceId) {
         await this.priceWheelsRepository.update(
        { price_wholesale: updatePriceDto.price_wholesale, 
          price: updatePriceDto.price, 
          id_supplier: updatePriceDto.id_supplier,
          delivery_price: updatePriceDto.delivery_price, 
          price_plus_delivery: updatePriceDto.price_plus_delivery,
          update_date: updatePriceDto.update_date
        }, {where: {id_wheel: updatePriceDto.id_wheel}});
        const updatePriceWheels = await this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, {include: {all: true}});
        return updatePriceWheels; 
      }
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async removePriceWheels(getPriceDto: GetPriceDto) {
    try {
      const removePriceWheels = await this.priceWheelsRepository.destroy({where: {id_wheel: getPriceDto.id_wheel}});
      return removePriceWheels;
    } catch {
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
  }
}