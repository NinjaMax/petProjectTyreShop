import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sales } from './entities/sale.model';

@Injectable()
export class SalesService {

  constructor(@InjectModel(Sales) private salesRepository: typeof Sales,
   ) {}

  async createSale(createSaleDto: CreateSaleDto) {

    try {

      const sale = await this.salesRepository.create(createSaleDto);

      return sale;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  async findAllSales() {

    try {

      const saleAll = await this.salesRepository.findAll({include: {all: true}});

      return saleAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  async findSaleById(getSaleDto: GetSaleDto) {

    try {

      const saleById = await this.salesRepository.findByPk(getSaleDto.id_sale, {include: {all: true}});

      return saleById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  async removeSale(getSaleDto: GetSaleDto) {

    try {

      const removeSale = await this.salesRepository.destroy({where: {id_sale : getSaleDto.id_sale}});

      return removeSale;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
  }
}
