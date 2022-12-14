import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractService } from 'src/contract/contract.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.model';


@Injectable()
export class CustomersService {

  constructor(@InjectModel(Customer) private customersRepository: typeof Customer,
    private contractService: ContractService
    ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {

    try {
      
      const customer = await this.customersRepository.create(createCustomerDto);

      const contractUser = await this.contractService.create(createCustomerDto);

      customer.$add('contract', contractUser);

      customer.reload();

      return customer;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAllCustomer() {

    try {

      const customerAll = await this.customersRepository.findAll({include: {all: true}});

      return customerAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async findCustomerById(getCustomerDto: GetCustomerDto) {

    try {

      const customerId = await this.customersRepository.findByPk(getCustomerDto.id_customer, {include: {all: true}});

      return customerId;

    } catch {

      throw new HttpException('Data ID is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} user`;
  }

  async removeCustomer(getCustomerDto: GetCustomerDto) {

    try {

      const removeCustomer = await this.customersRepository.destroy({where: {id_customer : getCustomerDto.id_customer}});
      
      return removeCustomer;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }
}