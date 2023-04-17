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
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockBatteries } from './entities/stock-batteries.model';
import { StorageService } from '../storage/storage.service';
import { BatteriesService } from '../batteries/batteries.service';
let StockBatteriesService = class StockBatteriesService {
    constructor(stockBatteriesRepository, batteriesService, suppliersService, storageService) {
        this.stockBatteriesRepository = stockBatteriesRepository;
        this.batteriesService = batteriesService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createStockBattery(createStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const battery = yield this.batteriesService.findBatteryById(createStockDto);
                const storage = yield this.storageService.findStorageById(createStockDto);
                if (battery) {
                    const stockCreate = yield this.stockBatteriesRepository.create(createStockDto);
                    const supplier = yield this.suppliersService.findSupplierById(createStockDto);
                    yield storage.$add('stock_batteries', [stockCreate.id]);
                    storage.stock_batteries.push(stockCreate);
                    yield battery.$add('stock', [createStockDto.id]);
                    yield supplier.$add('stock_batteries', [createStockDto.id_supplier]);
                    battery.stock.push(stockCreate);
                    supplier.stock_batteries.push(stockCreate);
                    return battery;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllStock() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockAllBatteries = yield this.stockBatteriesRepository.findAll({ include: { all: true } });
                return stockAllBatteries;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockBatteryByIdBattery(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockBatteryById = yield this.stockBatteriesRepository.findOne({ where: { id_battery: getStockDto.id_battery },
                    include: { all: true }
                });
                return stockBatteryById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockBatteryById(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockBatteryById = yield this.stockBatteriesRepository.findOne({ where: { id_battery: getStockDto.id },
                });
                return stockBatteryById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockBatteryByIdForSale(id_battery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockBatteryId = yield this.stockBatteriesRepository.findByPk(id_battery, { include: { all: true } });
                return stockBatteryId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateStockBattery(updateStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batteryIdUpdate = yield this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, { include: { all: true } });
                if (batteryIdUpdate) {
                    yield this.stockBatteriesRepository.update({
                        stock: updateStockDto.stock,
                        reserve: updateStockDto.reserve,
                        remainder: updateStockDto.remainder,
                        id_supplier: updateStockDto.id_supplier,
                        update_date: updateStockDto.update_date
                    }, { where: { id_battery: updateStockDto.id_battery } });
                    const updateStockBatteries = yield this.stockBatteriesRepository.findByPk(updateStockDto.id_battery, { include: { all: true } });
                    return updateStockBatteries;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeStockBattery(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeStockBatteries = yield this.stockBatteriesRepository.destroy({ where: { id_battery: getStockDto.id_battery } });
                return removeStockBatteries;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
StockBatteriesService = __decorate([
    Injectable(),
    __param(0, InjectModel(StockBatteries)),
    __metadata("design:paramtypes", [Object, BatteriesService,
        SuppliersService,
        StorageService])
], StockBatteriesService);
export { StockBatteriesService };
