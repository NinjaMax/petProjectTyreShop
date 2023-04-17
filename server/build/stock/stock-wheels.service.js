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
import { StockWheels } from './entities/stock-wheels.model';
import { StorageService } from '../storage/storage.service';
import { WheelsService } from '../wheels/wheels.service';
let StockWheelsService = class StockWheelsService {
    constructor(stockWheelsRepository, wheelsService, suppliersService, storageService) {
        this.stockWheelsRepository = stockWheelsRepository;
        this.wheelsService = wheelsService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createStockWheel(createStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheel = yield this.wheelsService.findWheelById(createStockDto);
                const storage = yield this.storageService.findStorageById(createStockDto);
                if (wheel) {
                    const stockCreate = yield this.stockWheelsRepository.create(createStockDto);
                    const supplier = yield this.suppliersService.findSupplierById(createStockDto);
                    yield storage.$add('stock_wheels', [stockCreate.id]);
                    storage.stock_wheels.push(stockCreate);
                    yield wheel.$add('stock', [createStockDto.id]);
                    yield supplier.$add('stock_wheels', [createStockDto.id_supplier]);
                    wheel.stock.push(stockCreate);
                    supplier.stock_wheels.push(stockCreate);
                    return wheel;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createStockWheelFromPrice(id, stock, id_supplier, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [WheelStock, created] = yield this.stockWheelsRepository.findOrCreate({ where: { id_wheel: +id, id_storage: 1 },
                    defaults: {
                        id_wheel: +id,
                        stock: +stock,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    } });
                if (!created) {
                    yield WheelStock.update({ stock: +stock,
                        id_supplier: +id_supplier,
                        update_date: update_date }, { where: { id_wheel: WheelStock.id_wheel, id_storage: 1 } });
                    return WheelStock;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllStock() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockAllWheels = yield this.stockWheelsRepository.findAll({ include: { all: true } });
                return stockAllWheels;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockWheelByIdWheel(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockWheelById = yield this.stockWheelsRepository.findOne({ where: { id_wheel: getStockDto.id_wheel },
                    include: { all: true }
                });
                return stockWheelById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockWheelById(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockWheelById = yield this.stockWheelsRepository.findOne({ where: { id_wheel: getStockDto.id },
                });
                return stockWheelById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockWheelByIdForSale(id_wheel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockWheelId = yield this.stockWheelsRepository.findByPk(id_wheel, { include: { all: true } });
                return stockWheelId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateStockWheel(updateStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelIdUpdate = yield this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, { include: { all: true } });
                if (wheelIdUpdate) {
                    yield this.stockWheelsRepository.update({ stock: updateStockDto.stock,
                        reserve: updateStockDto.reserve,
                        remainder: updateStockDto.remainder,
                        id_supplier: updateStockDto.id_supplier,
                        update_date: updateStockDto.update_date
                    }, { where: { id_wheel: updateStockDto.id_wheel } });
                    const updateStockWheel = yield this.stockWheelsRepository.findByPk(updateStockDto.id_wheel, { include: { all: true } });
                    return updateStockWheel;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeStockWheel(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeStockWheel = yield this.stockWheelsRepository.destroy({ where: { id_wheel: getStockDto.id_wheel } });
                return removeStockWheel;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
StockWheelsService = __decorate([
    Injectable(),
    __param(0, InjectModel(StockWheels)),
    __metadata("design:paramtypes", [Object, WheelsService,
        SuppliersService,
        StorageService])
], StockWheelsService);
export { StockWheelsService };
