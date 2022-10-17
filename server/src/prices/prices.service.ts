import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceTyresDto } from './dto/create-price_tyres.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
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

        const supplier = await this.suppliersService.findSupplierById(createPriceDto.id_sup);

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

      return `This action returns all prices`;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findOne(id: number) {
    try {

      return `This action returns a #${id} price`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async update(id: number, updatePriceDto: UpdatePriceTyresDto) {

    try {

      return `This action updates a #${id} price`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async remove(id: number) {

    try {

      return `This action removes a #${id} price`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
