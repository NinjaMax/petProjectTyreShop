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

    } catch (error) {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    

  }

  async findAllSupplier() {

    try {

      const supplierAll = await this.suppliersRepository.findAll({include: {all: true}});
      
      return supplierAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findSupplierById(getSupplierDto: GetSupplierDto) {

    try {

      const supplierById = await this.suppliersRepository.findByPk(getSupplierDto.id_sup, {include: {all: true}})
      
      return supplierById;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  updateSupplier(id: number, updateSupplierDto: UpdateSupplierDto) {

    try {

      return `This action updates a #${id} supplier`;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  removeSupplier(id: number) {

    try {

      return `This action removes a #${id} supplier`;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
