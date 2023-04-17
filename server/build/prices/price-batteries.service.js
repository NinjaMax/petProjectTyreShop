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
import { PriceBatteries } from './entities/price-battery.model';
import { BatteriesService } from '../batteries/batteries.service';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
let PriceBatteryService = class PriceBatteryService {
    constructor(priceBatteryRepository, batteriesService, suppliersService, storageService) {
        this.priceBatteryRepository = priceBatteryRepository;
        this.batteriesService = batteriesService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createPriceBatteries(createPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const battery = yield this.batteriesService.findBatteryById(createPriceDto);
                const storage = yield this.storageService.findStorageById(createPriceDto);
                if (battery) {
                    const priceCreate = yield this.priceBatteryRepository.create(createPriceDto);
                    const supplier = yield this.suppliersService.findSupplierById(createPriceDto);
                    yield storage.$add('price_batteries', [priceCreate.id_battery]);
                    storage.price_batteries.push(priceCreate);
                    yield battery.$add('price', [createPriceDto.id_battery]);
                    yield supplier.$add('price_batteries', [createPriceDto.id_supplier]);
                    battery.price.push(priceCreate);
                    supplier.price_batteries.push(priceCreate);
                    return battery;
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
                const priceBatteriesAll = yield this.priceBatteryRepository.findAll({ include: { all: true } });
                return priceBatteriesAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findPriceBatteriesById(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batteriesPriceId = yield this.priceBatteryRepository.findOne({ where: { id_battery: getPriceDto.id_battery },
                    include: { all: true }
                });
                return batteriesPriceId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updatePriceBattery(updatePriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batteryPriceId = yield this.priceBatteryRepository.findByPk(updatePriceDto.id_battery, { include: { all: true } });
                if (batteryPriceId) {
                    yield this.priceBatteryRepository.update({ price_wholesale: updatePriceDto.price_wholesale,
                        price: updatePriceDto.price,
                        id_supplier: updatePriceDto.id_supplier,
                        delivery_price: updatePriceDto.delivery_price,
                        price_plus_delivery: updatePriceDto.price_plus_delivery,
                        update_date: updatePriceDto.update_date
                    }, { where: { id_battery: updatePriceDto.id_battery } });
                    const updatePriceBatteries = yield this.priceBatteryRepository.findByPk(updatePriceDto.id_battery, { include: { all: true } });
                    return updatePriceBatteries;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removePriceBattery(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePriceBattery = yield this.priceBatteryRepository.destroy({ where: { id_battery: getPriceDto.id_battery } });
                return removePriceBattery;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PriceBatteryService = __decorate([
    Injectable(),
    __param(0, InjectModel(PriceBatteries)),
    __metadata("design:paramtypes", [Object, BatteriesService,
        SuppliersService,
        StorageService])
], PriceBatteryService);
export { PriceBatteryService };
