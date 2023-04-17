import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteries } from './entities/price-battery.model';
import { BatteriesService } from '../batteries/batteries.service';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';

@Injectable()
export class PriceBatteryService {

  constructor(@InjectModel(PriceBatteries) private priceBatteryRepository: typeof PriceBatteries,
    private batteriesService: BatteriesService, 
    private suppliersService: SuppliersService,
    private storageService: StorageService
  ) {}

  async createPriceBatteries(createPriceDto: CreatePriceDto) {
    
    try {

      const battery = await this.batteriesService.findBatteryById(createPriceDto);
      const storage = await this.storageService.findStorageById(createPriceDto);

      if(battery) {

        const priceCreate = await this.priceBatteryRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await storage.$add('price_batteries', [priceCreate.id_battery]);
        storage.price_batteries.push(priceCreate);

        await battery.$add('price', [createPriceDto.id_battery]);
       
        await supplier.$add('price_batteries', [createPriceDto.id_supplier]);
       
        battery.price.push(priceCreate);

        supplier.price_batteries.push(priceCreate);

        return battery;

      }

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAll() {

    try {

      const priceBatteriesAll = await this.priceBatteryRepository.findAll({include: {all: true}});

      return priceBatteriesAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findPriceBatteriesById(getPriceDto: GetPriceDto) {
    
    try {

      const batteriesPriceId = await this.priceBatteryRepository.findOne(
        {where: {id_battery: getPriceDto.id_battery}, 
        include: {all: true}
      });

      return batteriesPriceId;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updatePriceBattery( updatePriceDto: UpdatePriceTyresDto ) {

    try {

      const batteryPriceId = await this.priceBatteryRepository.findByPk(updatePriceDto.id_battery, {include: {all: true}});
      
      if(batteryPriceId) {

         await this.priceBatteryRepository.update(
        { price_wholesale: updatePriceDto.price_wholesale, 
          price: updatePriceDto.price, 
          id_supplier: updatePriceDto.id_supplier,
          delivery_price: updatePriceDto.delivery_price, 
          price_plus_delivery: updatePriceDto.price_plus_delivery,
          update_date: updatePriceDto.update_date
        }, {where: {id_battery : updatePriceDto.id_battery}});

        const updatePriceBatteries = await this.priceBatteryRepository.findByPk(updatePriceDto.id_battery, {include: {all: true}});

        return updatePriceBatteries; 
      }
      

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async removePriceBattery(getPriceDto: GetPriceDto) {

    try {

      const removePriceBattery = await this.priceBatteryRepository.destroy({where: {id_battery: getPriceDto.id_battery}});

      return removePriceBattery;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}