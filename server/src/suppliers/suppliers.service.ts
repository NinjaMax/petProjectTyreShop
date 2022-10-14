import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { Supplier } from './entities/supplier.model';


@Injectable()
export class SuppliersService {
  constructor(@InjectModel(Supplier) private suppliersRepository: typeof Supplier) {}


  async createSupplier(createSupplierDto: CreateSupplierDto) {

    try {

      const supplier = await this.suppliersRepository.create(createSupplierDto);

      return supplier;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    

  }

  async findAllSupplier() {

    try {

      const supplierAll = await this.suppliersRepository.findAll({include: {all: true}});
      
      return supplierAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findSupplierById(id_sup: number ) {

    try {

      const supplierById = await this.suppliersRepository.findByPk(id_sup, {include: {all: true}});
      
      return supplierById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  async findSupplierTitle(getSupplierDto: GetSupplierDto) {

    try {

      const supplierByTitle = await this.suppliersRepository.findOne({where: {name: getSupplierDto.name}})
      
      return supplierByTitle;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  updateSupplier(id: number, updateSupplierDto: UpdateSupplierDto) {

    try {

      return `This action updates a #${id} supplier`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  removeSupplier(id: number) {

    try {

      return `This action removes a #${id} supplier`;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
