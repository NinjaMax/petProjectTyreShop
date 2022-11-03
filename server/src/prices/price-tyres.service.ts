import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceTyres } from './entities/price-tyres.model';
import { TyresService } from 'src/tyres/tyres.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class PriceTyresService {

  constructor(@InjectModel(PriceTyres) private priceTyresRepository: typeof PriceTyres,
  private tyresService: TyresService, 
  private suppliersService : SuppliersService 
  ) {}

  async createPriceTyres(createPriceDto: CreatePriceDto) {
    
    try {

      const tyres = await this.tyresService.findTyresById(createPriceDto);
      
      if(tyres) {

        const priceCreate = await this.priceTyresRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await tyres.$add('price', [createPriceDto.id_tyres]);
       
        await supplier.$add('price_tyres', [createPriceDto.id_sup]);
       
        tyres.price.push(priceCreate);

        supplier.price_tyres.push(priceCreate);

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

  async findPriceTyresById(getPriceDto: GetPriceDto) {
    
    try {

      const tyresId = await this.priceTyresRepository.findByPk(getPriceDto.id_tyres, {include: {all: true}});

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

  async removePrice(getPriceDto: GetPriceDto) {

    try {

      const removePrice = await this.priceTyresRepository.destroy({where: {id_tyres : getPriceDto.id_tyres}});

      return removePrice;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
