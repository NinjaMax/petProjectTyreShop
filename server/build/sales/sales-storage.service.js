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
import { OrdersService } from '../orders/orders.service';
import { SaleStorage } from './entities/sales-storage.model';
let SalesStorageService = class SalesStorageService {
    constructor(salesStorageRepository, ordersService) {
        this.salesStorageRepository = salesStorageRepository;
        this.ordersService = ordersService;
    }
    createOrderSupStorage(createSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.salesStorageRepository.create(createSaleDto);
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createSalesStorageNew(id, id_order, id_supplier, quantity, price, sale_index, storage_index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.salesStorageRepository.create({ id,
                    id_order,
                    id_supplier,
                    quantity,
                    price,
                    sale_index,
                    storage_index
                }, { fields: ['id', 'id_order', 'id_supplier',
                        'quantity', 'price', 'sale_index'] });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllSalesStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salesStorageAll = yield this.salesStorageRepository.findAll({ include: { all: true } });
                return salesStorageAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllSalesStorageByOrd(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salesAllByOrder = yield this.salesStorageRepository.findAll({ where: { id_order: getSaleDto.id_order } });
                return salesAllByOrder;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllSaleStorageBySale(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleStorageBySale = yield this.salesStorageRepository.findAll({ where: { id_sale: getSaleDto.id_sale } });
                return saleStorageBySale;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findSaleStorageById(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupId = yield this.salesStorageRepository.findByPk(getSaleDto.id_sales_storage, { include: { all: true } });
                return orderSupId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateOrderStorage(updateSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageUpdate = yield this.salesStorageRepository.update({ id: updateSaleDto.id,
                    id_sale: updateSaleDto.id_sale,
                    id_order: updateSaleDto.id_order,
                    id_storage: updateSaleDto.id_storage,
                    quantity: updateSaleDto.quantity,
                    price: updateSaleDto.price
                }, { where: { id_sales_storage: updateSaleDto.id_sales_storage } });
                return orderStorageUpdate;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeOrderSupStorage(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.salesStorageRepository.destroy({ where: { id_sales_storage: getSaleDto.id_sales_storage } });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
SalesStorageService = __decorate([
    Injectable(),
    __param(0, InjectModel(SaleStorage)),
    __metadata("design:paramtypes", [Object, OrdersService])
], SalesStorageService);
export { SalesStorageService };
