import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractService } from '../contract/contract.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.model';
import * as argon2 from 'argon2';
import { Op } from 'sequelize';
import { Contract } from '../contract/entities/contract.model';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private customersRepository: typeof Customer,
    private contractService: ContractService,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto, password: string) {
    try {
      const customer = await this.customersRepository.create({
        id_customer: createCustomerDto.id_customer,
        password: password,
        email: createCustomerDto.email,
        id_contract: createCustomerDto.id_contract,
        balance: createCustomerDto.balance,
        name: createCustomerDto.name,
        phone: createCustomerDto.phone,
        full_name: createCustomerDto.full_name,
        picture: createCustomerDto.picture,
      });

      const contractCustomer = await this.contractService.createContract(
        createCustomerDto,
      );

      await customer.$add('contract', contractCustomer);

      await customer.reload();

      return customer;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createCustomerByEmail(
    createCustomerDto: CreateCustomerDto,
    password: string,
    phone: bigint,
  ) {
    try {
      const customer = await this.customersRepository.create({
        //id_customer: createCustomerDto.id_customer,
        password: password,
        email: createCustomerDto.email,
        // id_contract: createCustomerDto.id_contract,
        // balance: createCustomerDto.balance,
        name: createCustomerDto.name,
        phone: phone,
        full_name: createCustomerDto.full_name,
        picture: createCustomerDto.picture,
      });

      const contractCustomer = await this.contractService.createContract(
        createCustomerDto,
      );
      await customer.$add('contract', contractCustomer);
      await customer.reload();

      return customer;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOrCreateCustomer(getCustomerDto: GetCustomerDto) {
    try {
      const createPass = {
        password: await argon2.hash(String(getCustomerDto.phone)),
      };
      const [customerFindCreate, created] =
        await this.customersRepository.findOrCreate({
        where: {
          [Op.or]: [
            { email: getCustomerDto.email ?? 'mail@example.com' },
            { name: getCustomerDto.name },
            { phone: getCustomerDto.phone},
          ],
        },
        include: [Contract],
        defaults: {
          password: createPass.password,
          email: getCustomerDto.email,
          address: getCustomerDto.address,
          delivery: getCustomerDto.delivery,
          name: getCustomerDto.name,
          phone: getCustomerDto.phone,
          full_name: getCustomerDto.full_name,
          picture:  getCustomerDto.picture,
        }
      });
      if (created) {
        const contractNewCustomer = await this.contractService.createContract(
          getCustomerDto,
        );
        await customerFindCreate.$add('contract', contractNewCustomer);
        await customerFindCreate.reload();

        return customerFindCreate;

      } else {
        return customerFindCreate;
      }
    } catch {
      throw new HttpException(
        'Data Customer Email is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllCustomer() {
    try {
      const customerAll = await this.customersRepository.findAll({
        include: { all: true },
      });

      return customerAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCustomerById(getCustomerDto: GetCustomerDto) {
    try {
      const customerId = await this.customersRepository.findByPk(
        getCustomerDto.id_customer,
        { include: { all: true } },
      );

      return customerId;
    } catch {
      throw new HttpException(
        'Data ID is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCustomerByPhone(getCustomerDto: GetCustomerDto) {
    try {
      const customerByPhone = await this.customersRepository.findOne({
        where: { phone: getCustomerDto.phone}, 
        include: [Contract]
      });

      return customerByPhone;
    } catch {
      throw new HttpException(
        'Data Customer PHONE is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCustomerByEmail(getCustomerDto: GetCustomerDto) {
    try {
      const customerByEmail = await this.customersRepository.findOne({
        where: { email: getCustomerDto.email },
        include: [Contract]
      });

      return customerByEmail;
    } catch {
      throw new HttpException(
        'Data Customer Email is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCustmByEmailOrName(getCustomerDto: GetCustomerDto) {
    try {
      const customerByEmail = await this.customersRepository.findOne({
        where: {
          [Op.or]: [
            { email: getCustomerDto.email ?? 'mail@example.com' },
            { name: getCustomerDto.name },
          ],
        },
        include: [Contract]
      });
      return customerByEmail;
    } catch {
      throw new HttpException(
        'Data Customer Email is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customerId = await this.customersRepository.findByPk(
        updateCustomerDto.id_customer,
        { include: { all: true } },
      );

      if (customerId) {
        await this.customersRepository.update(
          {
            name: updateCustomerDto.name,
            full_name: updateCustomerDto.full_name,
            email: updateCustomerDto.email,
            address: updateCustomerDto.address,
            delivery: updateCustomerDto.delivery,
            phone: updateCustomerDto.phone,
            password: updateCustomerDto.password,
            picture: updateCustomerDto.picture,
            //update_date : updateTyreDto.update_date
          },
          { where: { id_customer: customerId.id_customer } },
        );

        customerId.save();

        return customerId;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeCustomer(getCustomerDto: GetCustomerDto) {
    try {
      const removeCustomer = await this.customersRepository.destroy({
        where: { id_customer: getCustomerDto.id_customer },
      });

      return removeCustomer;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
