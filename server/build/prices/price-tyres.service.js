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
import { PriceTyres } from './entities/price-tyres.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TyresService } from '../tyres/tyres.service';
let PriceTyresService = class PriceTyresService {
    constructor(priceTyresRepository, tyresService, suppliersService, storageService) {
        this.priceTyresRepository = priceTyresRepository;
        this.tyresService = tyresService;
        this.suppliersService = suppliersService;
        this.storageService = storageService;
    }
    createPriceTyres(createPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyres = yield this.tyresService.findTyresById(createPriceDto);
                const storage = yield this.storageService.findStorageById(createPriceDto);
                if (tyres) {
                    const priceCreate = yield this.priceTyresRepository.create(createPriceDto);
                    const supplier = yield this.suppliersService.findSupplierById(createPriceDto);
                    yield storage.$add('price_tyres', [priceCreate.id]);
                    storage.price_tyres.push(priceCreate);
                    yield tyres.$add('price', [createPriceDto.id]);
                    yield supplier.$add('price_tyres', [createPriceDto.id_supplier]);
                    tyres.price.push(priceCreate);
                    supplier.price_tyres.push(priceCreate);
                    return tyres;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    createPriceTyresFromPrice(id, price_wholesale, price, delivery_price, price_plus_delivery, id_supplier, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [priceTyreById, created] = yield this.priceTyresRepository.findOrCreate({ where: { id_tyre: +id, id_storage: 1 },
                    defaults: {
                        id_tyre: +id,
                        price_wholesale: +price_wholesale,
                        price: +price,
                        delivery_price: +delivery_price,
                        price_plus_delivery: +price_plus_delivery,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    } });
                if (!created) {
                    yield priceTyreById.update({
                        price_wholesale: +price_wholesale,
                        price: +price,
                        delivery_price: +delivery_price,
                        price_plus_delivery: +price_plus_delivery,
                        id_supplier: +id_supplier,
                        update_date: update_date
                    }, { where: { id_tyre: priceTyreById.id_tyre, id_storage: 1 } });
                    return priceTyreById;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyres() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceTyresAll = yield this.priceTyresRepository.findAll({ include: { all: true } });
                return priceTyresAll;
            }
            catch (error) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findPriceTyresById(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresById = yield this.priceTyresRepository.findOne({ where: { id_tyre: getPriceDto.id_tyre },
                    include: { all: true }
                });
                return tyresById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updatePriceTyres(updatePriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresId = yield this.priceTyresRepository.findByPk(updatePriceDto.id_tyre, { include: { all: true } });
                if (tyresId) {
                    yield this.priceTyresRepository.update({ price_wholesale: updatePriceDto.price_wholesale,
                        price: updatePriceDto.price,
                        id_supplier: updatePriceDto.id_supplier,
                        delivery_price: updatePriceDto.delivery_price,
                        price_plus_delivery: updatePriceDto.price_plus_delivery,
                        update_date: updatePriceDto.update_date
                    }, { where: { id_tyre: updatePriceDto.id_tyre } });
                    const updatePriceTyres = yield this.priceTyresRepository.findByPk(updatePriceDto.id_tyre, { include: { all: true } });
                    return updatePriceTyres;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removePrice(getPriceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removePrice = yield this.priceTyresRepository.destroy({ where: { id_tyre: getPriceDto.id_tyre } });
                return removePrice;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PriceTyresService = __decorate([
    Injectable(),
    __param(0, InjectModel(PriceTyres)),
    __metadata("design:paramtypes", [Object, TyresService,
        SuppliersService,
        StorageService])
], PriceTyresService);
export { PriceTyresService };
