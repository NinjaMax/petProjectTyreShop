import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { Tyres } from './entities/tyres.model';
import { StockService } from '../stock/stock.service';
import { CreateStockTyresDto } from 'src/stock/dto/create-stock_tyres.dto';

@Injectable()
export class TyresService {
  constructor(@InjectModel(Tyres) private tyresRepository: typeof Tyres,
    private stockService: StockService ) {}

  async createTyres(createTyreDto: CreateTyreDto) {

    try {
      
      const tyres = await this.tyresRepository.create(createTyreDto);

      return tyres;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async createTyresStock(createTyreDto: CreateTyreDto, createStockDto: CreateStockTyresDto, getTyreDto: GetTyreDto) {

    try {
      
      const tyres = await this.tyresRepository.findByPk(createTyreDto.id_tyres, {include: {all: true}});
      const stockCreate = await this.stockService.createStock(createStockDto, getTyreDto);
      await tyres.$add('stock', [stockCreate]);
      tyres.stock.push(stockCreate);

      return tyres;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }




  async findAllTyres() {

    try {

      const tyresAll = await this.tyresRepository.findAll({include: {all: true}});

      return tyresAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyresById(getTyreDto: GetTyreDto) {

    try {

      const tyresId = await this.tyresRepository.findByPk(getTyreDto.id_tyres, {include: {all: true}});

      return tyresId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
   
  }

  async updateTyres(updateTyreDto: UpdateTyreDto) {

    try {

      const tyresUpdate = await this.tyresRepository.update( {full_name: '0' }, {where: {id_tyres : updateTyreDto.id_tyres}});

      return tyresUpdate;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async remove(id: number) { 
    try {

      return `This action removes a #${id} tyre`;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }
}
