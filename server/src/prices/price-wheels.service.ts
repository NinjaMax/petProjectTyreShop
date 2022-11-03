import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { PriceWheels } from './entities/price-wheels.model';
import { WheelsService } from 'src/wheels/wheels.service';

@Injectable()
export class PriceWheelsService {

  constructor(@InjectModel(PriceWheels) private priceWheelsRepository: typeof PriceWheels,
  private wheelsService: WheelsService, 
  private suppliersService : SuppliersService 
  ) {}

  async createPriceWheels(createPriceDto: CreatePriceDto) {
    
    try {

      const wheel = await this.wheelsService.findWheelById(createPriceDto);
      
      if(wheel) {

        const priceCreate = await this.priceWheelsRepository.create(createPriceDto);

        const supplier = await this.suppliersService.findSupplierById(createPriceDto);

        await wheel.$add('price', [createPriceDto.id_wheel]);
       
        await supplier.$add('price', [createPriceDto.id_sup]);
       
        wheel.price.push(priceCreate);

        supplier.price_wheels.push(priceCreate);

        return wheel;

      }

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAll() {

    try {

      const priceWheelsAll = await this.priceWheelsRepository.findAll({include: {all: true}});

      return priceWheelsAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findPriceWheelsById(getPriceDto: GetPriceDto) {
    
    try {

      const wheelsPriceId = await this.priceWheelsRepository.findByPk(getPriceDto.id_wheel, {include: {all: true}});

      return wheelsPriceId;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async updatePriceWheels( updatePriceDto: UpdatePriceTyresDto ) {

    try {

      const wheelsPriceId = await this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, {include: {all: true}});
      
      if(wheelsPriceId) {

         await this.priceWheelsRepository.update(
        { price_wholesale : updatePriceDto.price_wholesale, 
          price : updatePriceDto.price, 
          id_sup : updatePriceDto.id_sup,
          delivery_price : updatePriceDto.delivery_price, 
          price_plus_delivery : updatePriceDto.price_plus_delivery,
          update_date : updatePriceDto.update_date
        }, {where: {id_wheel : updatePriceDto.id_wheel}});

        const updatePriceWheels = await this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, {include: {all: true}});

        return updatePriceWheels; 
      }
      

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  async removePriceWheels(getPriceDto: GetPriceDto) {

    try {

      const removePriceWheels = await this.priceWheelsRepository.destroy({where: {id_wheel : getPriceDto.id_wheel}});

      return removePriceWheels;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}