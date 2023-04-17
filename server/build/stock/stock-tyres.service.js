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
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StorageService } from '../storage/storage.service';
let StockTyresService = class StockTyresService {
    constructor(stockTyresRepository, tyresService, suppliersService, storageService) {
        this.stockTyresRepository = stockTyresRepository;
        this.tyresService = tyresService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createStockTyre(createStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyres = yield this.tyresService.findTyresById(createStockDto);
                const storage = yield this.storageService.findStorageById(createStockDto);
                if (tyres) {
                    const stockCreate = yield this.stockTyresRepository.create(createStockDto);
                    const supplier = yield this.suppliersService.findSupplierById(createStockDto);
                    yield storage.$add('stock_tyres', [stockCreate.id]);
                    storage.stock_tyres.push(stockCreate);
                    yield tyres.$add('stock', [createStockDto.id]);
                    yield supplier.$add('stock_tyres', [createStockDto.id_supplier]);
                    tyres.stock.push(stockCreate);
                    supplier.stock_tyres.push(stockCreate);
                    return tyres;
                }
                throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createStockTyreFromPrice(id, stock, id_supplier, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreStock, created] = yield this.stockTyresRepository.findOrCreate({ where: { id_tyre: +id, id_storage: 1 },
                    defaults: {
                        id_tyre: +id,
                        stock: +stock,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    } });
                if (!created) {
                    yield tyreStock.update({ stock: +stock,
                        id_supplier: +id_supplier,
                        update_date: update_date }, { where: { id_tyre: tyreStock.id_tyre, id_storage: 1 } });
                    return tyreStock;
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
                const stockAll = yield this.stockTyresRepository.findAll({ include: { all: true } });
                return stockAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockTyreByIdtyre(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockTyreById = yield this.stockTyresRepository.findOne({ where: { id_tyre: getStockDto.id_tyre },
                    include: { all: true }
                });
                return stockTyreById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockTyreById(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockTyreById = yield this.stockTyresRepository.findOne({ where: { id_tyre: getStockDto.id },
                });
                return stockTyreById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockTyreParamId(id_tyre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockTyreByParamId = yield this.stockTyresRepository.findByPk(id_tyre, { include: { all: true } });
                return stockTyreByParamId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStockTyreByIdForSale(id_tyre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockTyreId = yield this.stockTyresRepository.findByPk(id_tyre, { include: { all: true } });
                return stockTyreId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateStockTyres(updateStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresIdUpdate = yield this.stockTyresRepository.findByPk(updateStockDto.id_tyre, { include: { all: true } });
                if (tyresIdUpdate) {
                    yield this.stockTyresRepository.update({ stock: updateStockDto.stock,
                        reserve: updateStockDto.reserve,
                        remainder: updateStockDto.remainder,
                        id_supplier: updateStockDto.id_supplier,
                        update_date: updateStockDto.update_date
                    }, { where: { id_tyre: updateStockDto.id_tyre } });
                    const updateStockTyres = yield this.stockTyresRepository.findByPk(updateStockDto.id_tyre, { include: { all: true } });
                    return updateStockTyres;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeStockTyre(getStockDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeStockTyre = yield this.stockTyresRepository.destroy({ where: { id_tyre: getStockDto.id_tyre } });
                return removeStockTyre;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
StockTyresService = __decorate([
    Injectable(),
    __param(0, InjectModel(StockTyres)),
    __metadata("design:paramtypes", [Object, TyresService,
        SuppliersService,
        StorageService])
], StockTyresService);
export { StockTyresService };
