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
import { PriceWheels } from './entities/price-wheels.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { WheelsService } from '../wheels/wheels.service';
let PriceWheelsService = class PriceWheelsService {
    constructor(priceWheelsRepository, wheelsService, suppliersService, storageService) {
        this.priceWheelsRepository = priceWheelsRepository;
        this.wheelsService = wheelsService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createPriceWheels(createPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheel = yield this.wheelsService.findWheelById(createPriceDto);
                const storage = yield this.storageService.findStorageById(createPriceDto);
                if (wheel) {
                    const priceCreate = yield this.priceWheelsRepository.create(createPriceDto);
                    const supplier = yield this.suppliersService.findSupplierById(createPriceDto);
                    yield storage.$add('price_wheels', [priceCreate.id]);
                    storage.price_wheels.push(priceCreate);
                    yield wheel.$add('price', [createPriceDto.id_wheel]);
                    yield supplier.$add('price', [createPriceDto.id_supplier]);
                    wheel.price.push(priceCreate);
                    supplier.price_wheels.push(priceCreate);
                    return wheel;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    createPriceWheelsFromPrice(id, price_wholesale, price, delivery_price, price_plus_delivery, id_supplier, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [priceByWheelId, created] = yield this.priceWheelsRepository.findOrCreate({ where: { id_wheel: +id, id_storage: 1 },
                    defaults: {
                        id_wheel: +id,
                        price_wholesale: +price_wholesale,
                        price: +price,
                        delivery_price: +delivery_price,
                        price_plus_delivery: +price_plus_delivery,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    } });
                if (!created) {
                    yield priceByWheelId.update({
                        price_wholesale: +price_wholesale,
                        price: +price,
                        delivery_price: +delivery_price,
                        price_plus_delivery: +price_plus_delivery,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    }, { where: { id_wheel: priceByWheelId.id_wheel, id_storage: 1 } });
                    return priceByWheelId;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceWheelsAll = yield this.priceWheelsRepository.findAll({ include: { all: true } });
                return priceWheelsAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findPriceWheelsById(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelsPriceById = yield this.priceWheelsRepository.findOne({ where: { id_wheel: getPriceDto.id_wheel },
                    include: { all: true }
                });
                return wheelsPriceById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updatePriceWheels(updatePriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelsPriceId = yield this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, { include: { all: true } });
                if (wheelsPriceId) {
                    yield this.priceWheelsRepository.update({ price_wholesale: updatePriceDto.price_wholesale,
                        price: updatePriceDto.price,
                        id_supplier: updatePriceDto.id_supplier,
                        delivery_price: updatePriceDto.delivery_price,
                        price_plus_delivery: updatePriceDto.price_plus_delivery,
                        update_date: updatePriceDto.update_date
                    }, { where: { id_wheel: updatePriceDto.id_wheel } });
                    const updatePriceWheels = yield this.priceWheelsRepository.findByPk(updatePriceDto.id_wheel, { include: { all: true } });
                    return updatePriceWheels;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removePriceWheels(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePriceWheels = yield this.priceWheelsRepository.destroy({ where: { id_wheel: getPriceDto.id_wheel } });
                return removePriceWheels;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PriceWheelsService = __decorate([
    Injectable(),
    __param(0, InjectModel(PriceWheels)),
    __metadata("design:paramtypes", [Object, WheelsService,
        SuppliersService,
        StorageService])
], PriceWheelsService);
export { PriceWheelsService };
