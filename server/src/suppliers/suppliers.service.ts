import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { Supplier } from './entities/supplier.model';
import { ContractService } from '../contract/contract.service';
import { Contract } from '../contract/entities/contract.model';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier) private suppliersRepository: typeof Supplier, 
    private contractService: ContractService){}

  async createSupplier(createSupplierDto: CreateSupplierDto) {
    try {
      const supplier = await this.suppliersRepository.create(createSupplierDto);
      const contractUser = await this.contractService.createContract(
        createSupplierDto
      );
      await supplier.$add('contract', contractUser);
      await supplier.reload();
      return supplier;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async createSupplierFromPrice(
    id_supplier: number, 
    name: string,
    city: string, 
    city_ua: string
  ) {
    try {
      const [supplierFind, created] = 
        await this.suppliersRepository.findOrCreate({
          where: { id_supplier: id_supplier },
          defaults: {
            id_supplier: id_supplier,
            name: name +' ('+ city_ua +')',
            city: city,
            city_ua: city_ua,
          },
        });
      if (!created) {
        await supplierFind.update(
          { name: name +' ('+ city_ua +')', city: city, city_ua: city_ua },
          { where: { id_supplier: supplierFind.id_supplier }},
        );
        return supplierFind;
      } else {
        const contractSupplier =
          await this.contractService.createContractFromPrice(id_supplier, name);
        return contractSupplier;
      }
    } catch (error) {
        console.log('ERROR_GET: ', error, 'SUPPLIER: ', name, 'ID_SUP: ', id_supplier)
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findAllSupplier() {
    try {
      const supplierAll = await this.suppliersRepository.findAll({
        include: { model: Contract }
      });
      return supplierAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findSupplierById(getSupplierDto: GetSupplierDto) {
    try {
      const supplierById = await this.suppliersRepository.findByPk(
        getSupplierDto.id_supplier,{
          include: { model: Contract },
        },
      );
      return supplierById;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findSupplierByIdParam(id: number) {
    try {
      const supplierByIdParam = await this.suppliersRepository.findByPk(id, {
        include: [{ model: Contract }],
      });
      return supplierByIdParam;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findSupplierByIdPrice(id_supplier: number) {
    try {
      const supplierByIdPrice = await this.suppliersRepository.findByPk(
        id_supplier, {
          include: [{ model: Contract }],
        },
      );
      return supplierByIdPrice;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findSupplierTitle(getSupplierDto: GetSupplierDto) {
    try {
      const supplierByTitle = await this.suppliersRepository.findOne({
        where: { name: getSupplierDto.name }
      })
      return supplierByTitle;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async updateSupplier(updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplierId = await this.suppliersRepository.findByPk(
        updateSupplierDto.id_supplier,
        { include: [{ model: Contract }] },
      );
      if (supplierId) {
        await this.suppliersRepository.update(
          {
            name: updateSupplierDto.name,
            city: updateSupplierDto.city,
            phone: updateSupplierDto.phone,
            email: updateSupplierDto.email,
            delivery: updateSupplierDto.delivery,
          },
          { where: { id_supplier: updateSupplierDto.id_supplier } },
        );
        const updateSupplier = await this.suppliersRepository.findByPk(
          updateSupplierDto.id_supplier,
          { include: [{ model: Contract }] },
        );
        return updateSupplier; 
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async removeSupplier(getSupplierDto: GetSupplierDto) {
    try {
      const removeSupplier = await this.suppliersRepository.destroy({
        where: { id_supplier: getSupplierDto.id_supplier },
      });
      return removeSupplier;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND
      );
    }
  }
}
