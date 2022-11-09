import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { PriceOil } from './entities/price-oils.model';
import { OilsService } from 'src/oils/oils.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class PriceOilsService {

  constructor(@InjectModel(PriceOil) private priceOilsRepository: typeof PriceOil,
    private oilsService: OilsService, 
    private suppliersService : SuppliersService,
    private storageService: StorageService  
  ) {}

  async createPriceOils(createPriceDto: CreatePriceDto) {
    
    try {

      const oil = await this.oilsService.findOilById(createPriceDto);
      const storage = await this.storageService.findStorageById(createPriceDto);

      if(oil) {

        const priceCreate = await this.priceOilsRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await storage.$add('price_oils', [priceCreate.id_oil]);
        storage.price_oils.push(priceCreate);

        await oil.$add('price', [createPriceDto.id_oil]);
       
        await supplier.$add('price_oils', [createPriceDto.id_sup]);
       
        oil.price.push(priceCreate);

        supplier.price_oils.push(priceCreate);

        return oil;

      }

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAll() {

    try {

      const priceOilAll = await this.priceOilsRepository.findAll({include: {all: true}});

      return priceOilAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findPriceOilsById(getPriceDto: GetPriceDto) {
    
    try {

      const oilsPriceId = await this.priceOilsRepository.findByPk(getPriceDto.id_oil, {include: {all: true}});

      return oilsPriceId;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updatePriceOils( updatePriceDto: UpdatePriceTyresDto ) {

    try {

      const oilsPriceId = await this.priceOilsRepository.findByPk(updatePriceDto.id_oil, {include: {all: true}});
      
      if(oilsPriceId) {

         await this.priceOilsRepository.update(
        { price_wholesale : updatePriceDto.price_wholesale, 
          price : updatePriceDto.price, 
          id_sup : updatePriceDto.id_sup,
          delivery_price : updatePriceDto.delivery_price, 
          price_plus_delivery : updatePriceDto.price_plus_delivery,
          update_date : updatePriceDto.update_date
        }, {where: {id_oil : updatePriceDto.id_oil}});

        const updatePriceOils = await this.priceOilsRepository.findByPk(updatePriceDto.id_oil, {include: {all: true}});

        return updatePriceOils; 
      }
      

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async removePriceOils(getPriceDto: GetPriceDto) {

    try {

      const removePriceOils = await this.priceOilsRepository.destroy({where: {id_oil : getPriceDto.id_oil}});

      return removePriceOils;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}