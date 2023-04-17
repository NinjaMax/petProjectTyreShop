import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceTyres } from './entities/price-tyres.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TyresService } from '../tyres/tyres.service';

@Injectable()
export class PriceTyresService {

  constructor(@InjectModel(PriceTyres) private priceTyresRepository: typeof PriceTyres,
    private tyresService: TyresService, 
    private suppliersService: SuppliersService, 
    private storageService: StorageService
  ) {}

  async createPriceTyres(createPriceDto: CreatePriceDto) {
    
    try {

      const tyres = await this.tyresService.findTyresById(createPriceDto);
      const storage = await this.storageService.findStorageById(createPriceDto);

      if(tyres) {

        const priceCreate = await this.priceTyresRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await storage.$add('price_tyres', [priceCreate.id]);
        storage.price_tyres.push(priceCreate);

        await tyres.$add('price', [createPriceDto.id]);
       
        await supplier.$add('price_tyres', [createPriceDto.id_supplier]);
       
        tyres.price.push(priceCreate);

        supplier.price_tyres.push(priceCreate);

        return tyres;

      }

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async createPriceTyresFromPrice(
    id: number,
    price_wholesale: number,
    price: number,
    delivery_price: number,
    price_plus_delivery: number,
    id_supplier: number,
    update_date: Date
    ) {
    
    try {

      const [priceTyreById, created] = await this.priceTyresRepository.findOrCreate(
        {where: {id_tyre: +id, id_storage: 1}, 
        defaults:{
          id_tyre: +id,
          price_wholesale: +price_wholesale,
          price: +price,
          delivery_price: +delivery_price,
          price_plus_delivery: +price_plus_delivery,
          id_supplier: +id_supplier,
          update_date: update_date
        }});

      if(!created) {
        
        await priceTyreById.update({
          price_wholesale: +price_wholesale,
          price: +price,
          delivery_price: +delivery_price,
          price_plus_delivery: +price_plus_delivery,
          id_supplier: +id_supplier,
          update_date: update_date}, 
        {where:{id_tyre: priceTyreById.id_tyre, id_storage: 1}});

        return priceTyreById;
      } 

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  
  }

  async findAllTyres() {

    try {

      const priceTyresAll = await this.priceTyresRepository.findAll({include: {all: true}});

      return priceTyresAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findPriceTyresById(getPriceDto: GetPriceDto) {
    
    try {

      const tyresById = await this.priceTyresRepository.findOne(
        {where: {id_tyre: getPriceDto.id_tyre}, 
        include: {all: true}
      });

      return tyresById;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updatePriceTyres(updatePriceDto: UpdatePriceTyresDto) {

    try {

      const tyresId = await this.priceTyresRepository.findByPk(updatePriceDto.id_tyre, {include: {all: true}});
      
      if(tyresId) {

         await this.priceTyresRepository.update(
        { price_wholesale: updatePriceDto.price_wholesale, 
          price: updatePriceDto.price, 
          id_supplier: updatePriceDto.id_supplier,
          delivery_price: updatePriceDto.delivery_price, 
          price_plus_delivery: updatePriceDto.price_plus_delivery,
          update_date: updatePriceDto.update_date
        }, {where: {id_tyre: updatePriceDto.id_tyre}});

        const updatePriceTyres = await this.priceTyresRepository.findByPk(updatePriceDto.id_tyre, {include: {all: true}});

        return updatePriceTyres; 
      }
      

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async removePrice(getPriceDto: GetPriceDto) {

    try {

      const removePrice = await this.priceTyresRepository.destroy({where: {id_tyre: getPriceDto.id_tyre}});

      return removePrice;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
