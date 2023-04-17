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
import { Contract } from './entities/contract.model';
let ContractService = class ContractService {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    createContract(createContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractNew = yield this.contractRepository.create(createContractDto);
                contractNew.name = createContractDto.name + " Основний договір";
                contractNew.save();
                return contractNew;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    createContractFromPrice(id_supplier, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findContract = yield this.contractRepository.findOne({ where: { id_supplier: +id_supplier } });
                if (findContract) {
                    return findContract;
                }
                else {
                    let contractPrice = yield this.contractRepository.create({ name });
                    contractPrice.name = name + " Основний договір";
                    contractPrice.save();
                    yield contractPrice.$set('supplier', id_supplier);
                    return contractPrice;
                }
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllContract() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractAll = yield this.contractRepository.findAll({ include: { all: true } });
                return contractAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findContractById(getContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractById = yield this.contractRepository.findByPk(getContractDto.id_contract, { include: { all: true } });
                return contractById;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllContractByCustomer(getContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractByCustomer = yield this.contractRepository.findAll({ where: { id_customer: getContractDto.id_customer } });
                return contractByCustomer;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateContractDto) {
        return `This action updates a #${id} paynment`;
    }
    removeContract(getContractDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractRemove = yield this.contractRepository.destroy({ where: { id_contract: getContractDto.id_contract } });
                return contractRemove;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
ContractService = __decorate([
    Injectable(),
    __param(0, InjectModel(Contract)),
    __metadata("design:paramtypes", [Object])
], ContractService);
export { ContractService };
