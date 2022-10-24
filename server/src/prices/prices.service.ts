import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceTyresDto } from './dto/create-price_tyres.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceTyresDto } from './dto/get-price_tyres.dto';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { TyresService } from 'src/tyres/tyres.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class PricesService {

  constructor(@InjectModel(PriceTyres) private priceTyresRepository: typeof PriceTyres,
  private tyresService: TyresService, 
  private suppliersService : SuppliersService 
  ) {}

  async createPriceTyres(createPriceDto: CreatePriceTyresDto) {
    
    try {

      const tyres = await this.tyresService.findTyresById(createPriceDto);
      
      if(tyres) {

        const priceCreate = await this.priceTyresRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await tyres.$add('price', [createPriceDto.id_tyres]);
       
        await supplier.$add('price', [createPriceDto.id_sup]);
       
        tyres.price.push(priceCreate);

        supplier.price.push(priceCreate);

        return tyres;

      }

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAll() {

    try {

      const priceTyresAll = await this.priceTyresRepository.findAll({include: {all: true}});

      return priceTyresAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findPriceTyresById(getPriceTyresDto: GetPriceTyresDto) {
    
    try {

      const tyresId = await this.priceTyresRepository.findByPk(getPriceTyresDto.id_tyres, {include: {all: true}});

      return tyresId;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updatePriceTyres( updatePriceDto: UpdatePriceTyresDto ) {

    try {

      const tyresId = await this.priceTyresRepository.findByPk(updatePriceDto.id_tyres, {include: {all: true}});
      
      if(tyresId) {

         await this.priceTyresRepository.update(
        { price_wholesale : updatePriceDto.price_wholesale, 
          price : updatePriceDto.price, 
          id_sup : updatePriceDto.id_sup,
          delivery_price : updatePriceDto.delivery_price, 
          price_plus_delivery : updatePriceDto.price_plus_delivery,
          update_date : updatePriceDto.update_date
        }, {where: {id_tyres : updatePriceDto.id_tyres}});

        const updatePriceTyres = await this.priceTyresRepository.findByPk(updatePriceDto.id_tyres, {include: {all: true}});

        return updatePriceTyres; 
      }
      

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async removePrice(getPriceTyresDto: GetPriceTyresDto) {

    try {

      const removePrice = await this.priceTyresRepository.destroy({where: {id_tyres : getPriceTyresDto.id_tyres}});

      return removePrice;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
