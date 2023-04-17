var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractService } from '../contract/contract.service';
import { Customer } from './entities/customer.model';
let CustomersService = class CustomersService {
    constructor(customersRepository, contractService) {
        this.customersRepository = customersRepository;
        this.contractService = contractService;
    }
    createCustomer(createCustomerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.customersRepository.create(createCustomerDto);
                const contractUser = yield this.contractService.createContract(createCustomerDto);
                yield customer.$add('contract', contractUser);
                yield customer.reload();
                return customer;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerAll = yield this.customersRepository.findAll({ include: { all: true } });
                return customerAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findCustomerById(getCustomerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = yield this.customersRepository.findByPk(getCustomerDto.id_customer, { include: { all: true } });
                return customerId;
            }
            catch (_a) {
                throw new HttpException('Data ID is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateCustomerDto) {
        return `This action updates a #${id} user`;
    }
    removeCustomer(getCustomerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeCustomer = yield this.customersRepository.destroy({ where: { id_customer: getCustomerDto.id_customer } });
                return removeCustomer;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
CustomersService = __decorate([
    Injectable(),
    __param(0, InjectModel(Customer)),
    __metadata("design:paramtypes", [Object, ContractService])
], CustomersService);
export { CustomersService };
