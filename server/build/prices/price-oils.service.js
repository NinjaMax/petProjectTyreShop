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
import { PriceOil } from './entities/price-oils.model';
import { OilsService } from '../oils/oils.service';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
let PriceOilsService = class PriceOilsService {
    constructor(priceOilsRepository, oilsService, suppliersService, storageService) {
        this.priceOilsRepository = priceOilsRepository;
        this.oilsService = oilsService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createPriceOils(createPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oil = yield this.oilsService.findOilById(createPriceDto);
                const storage = yield this.storageService.findStorageById(createPriceDto);
                if (oil) {
                    const priceCreate = yield this.priceOilsRepository.create(createPriceDto);
                    const supplier = yield this.suppliersService.findSupplierById(createPriceDto);
                    yield storage.$add('price_oils', [priceCreate.id_oil]);
                    storage.price_oils.push(priceCreate);
                    yield oil.$add('price', [createPriceDto.id_oil]);
                    yield supplier.$add('price_oils', [createPriceDto.id_supplier]);
                    oil.price.push(priceCreate);
                    supplier.price_oils.push(priceCreate);
                    return oil;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceOilAll = yield this.priceOilsRepository.findAll({ include: { all: true } });
                return priceOilAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findPriceOilsById(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilsPriceId = yield this.priceOilsRepository.findOne({ where: { id_oil: getPriceDto.id_oil },
                    include: { all: true }
                });
                return oilsPriceId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updatePriceOils(updatePriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilPriceIdUpdate = yield this.priceOilsRepository.findByPk(updatePriceDto.id_oil, { include: { all: true } });
                if (oilPriceIdUpdate) {
                    yield this.priceOilsRepository.update({ price_wholesale: updatePriceDto.price_wholesale,
                        price: updatePriceDto.price,
                        id_supplier: updatePriceDto.id_supplier,
                        delivery_price: updatePriceDto.delivery_price,
                        price_plus_delivery: updatePriceDto.price_plus_delivery,
                        update_date: updatePriceDto.update_date
                    }, { where: { id_oil: updatePriceDto.id_oil } });
                    const updatePriceOils = yield this.priceOilsRepository.findByPk(updatePriceDto.id_oil, { include: { all: true } });
                    return updatePriceOils;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removePriceOils(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePriceOils = yield this.priceOilsRepository.destroy({ where: { id_oil: getPriceDto.id_oil } });
                return removePriceOils;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PriceOilsService = __decorate([
    Injectable(),
    __param(0, InjectModel(PriceOil)),
    __metadata("design:paramtypes", [Object, OilsService,
        SuppliersService,
        StorageService])
], PriceOilsService);
export { PriceOilsService };
