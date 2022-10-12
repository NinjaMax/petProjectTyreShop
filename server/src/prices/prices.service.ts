import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceTyresDto } from './dto/create-price_tyres.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { PriceTyres } from '../prices/entities/price-tyres.model';

@Injectable()
export class PricesService {

  constructor(@InjectModel(PriceTyres) private priceTyresRepository: typeof PriceTyres) {}

  async create(createPriceDto: CreatePriceTyresDto) {
    
    try {

      return 'This action adds a new price';

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
