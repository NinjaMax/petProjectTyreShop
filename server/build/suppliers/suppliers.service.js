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
import { Supplier } from './entities/supplier.model';
import { ContractService } from '../contract/contract.service';
let SuppliersService = class SuppliersService {
    constructor(suppliersRepository, contractService) {
        this.suppliersRepository = suppliersRepository;
        this.contractService = contractService;
    }
    createSupplier(createSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplier = yield this.suppliersRepository.create(createSupplierDto);
                const contractUser = yield this.contractService.createContract(createSupplierDto);
                yield supplier.$add('contract', contractUser);
                yield supplier.reload();
                return supplier;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    createSupplierFromPrice(id_supplier, name, city, city_ua) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [supplierFind, created] = yield this.suppliersRepository.findOrCreate({
                    where: { id_supplier: id_supplier },
                    defaults: {
                        id_supplier: id_supplier,
                        name: name,
                        city: city,
                        city_ua: city_ua
                    }
                });
                if (!created) {
                    yield supplierFind.update({ name: name,
                        city: city,
                        city_ua: city_ua }, { where: { id_supplier: supplierFind.id_supplier } });
                    return supplierFind;
                }
                else {
                    let contractSupplier = yield this.contractService.
                        createContractFromPrice(id_supplier, name);
                    return contractSupplier;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllSupplier() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierAll = yield this.suppliersRepository.findAll({ include: { all: true } });
                return supplierAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findSupplierById(getSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierById = yield this.suppliersRepository.findByPk(getSupplierDto.id_supplier, { include: { all: true } });
                return supplierById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findSupplierByIdPrice(id_supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierById = yield this.suppliersRepository.findByPk(id_supplier, { include: { all: true } });
                return supplierById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findSupplierTitle(getSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierByTitle = yield this.suppliersRepository.findOne({ where: { name: getSupplierDto.name } });
                return supplierByTitle;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateSupplier(updateSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierId = yield this.suppliersRepository.findByPk(updateSupplierDto.id_supplier, { include: { all: true } });
                if (supplierId) {
                    yield this.suppliersRepository.update({
                        name: updateSupplierDto.name,
                        city: updateSupplierDto.city,
                        phone: updateSupplierDto.phone,
                        email: updateSupplierDto.email,
                        delivery: updateSupplierDto.delivery
                    }, { where: { id_supplier: updateSupplierDto.id_supplier } });
                    const updateSupplier = yield this.suppliersRepository.findByPk(updateSupplierDto.id_supplier, { include: { all: true } });
                    return updateSupplier;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeSupplier(getSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeSupplier = yield this.suppliersRepository.destroy({ where: { id_supplier: getSupplierDto.id_supplier } });
                return removeSupplier;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
SuppliersService = __decorate([
    Injectable(),
    __param(0, InjectModel(Supplier)),
    __metadata("design:paramtypes", [Object, ContractService])
], SuppliersService);
export { SuppliersService };
