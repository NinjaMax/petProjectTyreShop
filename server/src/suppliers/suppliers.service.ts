import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { Supplier } from './entities/supplier.model';
import { ContractService } from 'src/contract/contract.service';


@Injectable()
export class SuppliersService {
  constructor(@InjectModel(Supplier) private suppliersRepository: typeof Supplier, 
    private contractService: ContractService) {}

  async createSupplier(createSupplierDto: CreateSupplierDto) {

    try {

      const supplier = await this.suppliersRepository.create(createSupplierDto);

      const contractUser = await this.contractService.createContract(createSupplierDto);

      supplier.$add('contract', contractUser);

      supplier.reload();

      return supplier;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async createSupplierFromPrice(id_supplier: number, name: string,
     city: string, city_ua: string) {

    try {

      const supplierId = await this.suppliersRepository.findByPk(id_supplier);

      if(supplierId) {

        const updateSup = await this.suppliersRepository.update(
          {id_supplier: id_supplier, name: name, city: city, 
            city_ua: city_ua},
          {where:{id_supplier: supplierId.id_supplier}}
        );

        return updateSup;

      } else {

        const supplierNew = await this.suppliersRepository.create(
          {id_supplier, name, city, city_ua});

        const contractUser = await this.contractService.
        createContractFromPrice(name);

        supplierNew.$add('contract', contractUser);

        supplierNew.reload();

        return supplierNew;
      }
      
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

      const supplierById = await this.suppliersRepository.findByPk(getSupplierDto.id_supplier, {include: {all: true}});
      
      return supplierById;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  async findSupplierByIdPrice(id_supplier: number) {

    try {

      const supplierById = await this.suppliersRepository.findByPk(id_supplier, {include: {all: true}});
      
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

      const supplierId = await this.suppliersRepository.findByPk(updateSupplierDto.id_supplier, {include: {all: true}});
      
      if(supplierId) {

        await this.suppliersRepository.update(
        {  
          name : updateSupplierDto.name,
          city : updateSupplierDto.city, 
          phone : updateSupplierDto.phone,
          email : updateSupplierDto.email
        }, {where: {id_supplier : updateSupplierDto.id_supplier}});

        const updateSupplier = await this.suppliersRepository.findByPk(updateSupplierDto.id_supplier, {include: {all: true}});

        return updateSupplier; 
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
    }
    
  }

  async removeSupplier(getSupplierDto: GetSupplierDto) {

    try {

      const removeSupplier = await this.suppliersRepository.destroy({where: {id_supplier : getSupplierDto.id_supplier}});
      
      return removeSupplier;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }
}
