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
import { StockOils } from './entities/stock-oils.model';
import { OilsService } from '../oils/oils.service';
import { StorageService } from '../storage/storage.service';
let StockOilsService = class StockOilsService {
    constructor(stockOilsRepository, oilsService, suppliersService, storageService) {
        this.stockOilsRepository = stockOilsRepository;
        this.oilsService = oilsService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createStockOils(createStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oil = yield this.oilsService.findOilById(createStockDto);
                const storage = yield this.storageService.findStorageById(createStockDto);
                if (oil) {
                    const stockCreate = yield this.stockOilsRepository.create(createStockDto);
                    const supplier = yield this.suppliersService.findSupplierById(createStockDto);
                    yield storage.$add('stock_oils', [stockCreate.id]);
                    storage.stock_oils.push(stockCreate);
                    yield oil.$add('stock', [createStockDto.id]);
                    yield supplier.$add('stock_oils', [createStockDto.id_supplier]);
                    oil.stock.push(stockCreate);
                    supplier.stock_oils.push(stockCreate);
                    return oil;
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
                const stockAllOils = yield this.stockOilsRepository.findAll({ include: { all: true } });
                return stockAllOils;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockOilByIdOil(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockOilById = yield this.stockOilsRepository.findOne({ where: { id_oil: getStockDto.id_oil },
                    include: { all: true }
                });
                return stockOilById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockOilById(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockOilById = yield this.stockOilsRepository.findOne({ where: { id_oil: getStockDto.id },
                });
                return stockOilById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockOilByIdForSale(id_oil) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockOilId = yield this.stockOilsRepository.findByPk(id_oil, { include: { all: true } });
                return stockOilId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateStockOil(updateStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilIdUpdate = yield this.stockOilsRepository.findByPk(updateStockDto.id_oil, { include: { all: true } });
                if (oilIdUpdate) {
                    yield this.stockOilsRepository.update({
                        stock: updateStockDto.stock,
                        reserve: updateStockDto.reserve,
                        remainder: updateStockDto.remainder,
                        id_supplier: updateStockDto.id_supplier,
                        update_date: updateStockDto.update_date
                    }, { where: { id_oil: updateStockDto.id_oil } });
                    const updateStockOils = yield this.stockOilsRepository.findByPk(updateStockDto.id_oil, { include: { all: true } });
                    return updateStockOils;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeStockOil(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeStockOils = yield this.stockOilsRepository.destroy({ where: { id_oil: getStockDto.id_oil } });
                return removeStockOils;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
StockOilsService = __decorate([
    Injectable(),
    __param(0, InjectModel(StockOils)),
    __metadata("design:paramtypes", [Object, OilsService,
        SuppliersService,
        StorageService])
], StockOilsService);
export { StockOilsService };
