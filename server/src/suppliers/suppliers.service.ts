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

  async findSupplierById( getSupplierDto: GetSupplierDto ) {

    try {

      const supplierById = await this.suppliersRepository.findByPk(getSupplierDto.id_sup, {include: {all: true}});
      
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

  async updateSupplier(updateSupplierDto: UpdateSupplierDto) {

    try {

      const supplierId = await this.suppliersRepository.findByPk(updateSupplierDto.id_sup, {include: {all: true}});
      
      if(supplierId) {

        await this.suppliersRepository.update(
        {  
          name : updateSupplierDto.name,
          city : updateSupplierDto.city, 
          phone : updateSupplierDto.phone,
          email : updateSupplierDto.email
        }, {where: {id_sup : updateSupplierDto.id_sup}});

        const updateSupplier = await this.suppliersRepository.findByPk(updateSupplierDto.id_sup, {include: {all: true}});

        return updateSupplier; 
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  async removeSupplier(getSupplierDto: GetSupplierDto) {

    try {

      const removeSupplier = await this.suppliersRepository.destroy({where: {id_sup : getSupplierDto.id_sup}});
      
      return removeSupplier;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
