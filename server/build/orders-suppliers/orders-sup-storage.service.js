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
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
let OrdersSupStorageService = class OrdersSupStorageService {
    constructor(ordersSupStorageRepository, ordersService) {
        this.ordersSupStorageRepository = ordersSupStorageRepository;
        this.ordersService = ordersService;
    }
    createOrderSupStorage(createOrdersSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.ordersSupStorageRepository.create(createOrdersSupplierDto);
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createOrderSupStorageNew(id, id_order, id_supplier, quantity, price, storage_index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.ordersSupStorageRepository.create({ id,
                    id_order,
                    id_supplier,
                    quantity,
                    price,
                    storage_index }, { fields: ['id', 'id_order', 'id_supplier',
                        'quantity', 'price', 'storage_index'] });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersSupStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupAll = yield this.ordersSupStorageRepository.findAll({ include: { all: true } });
                return orderSupAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersSupStorageByOrd(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupAllByOrder = yield this.ordersSupStorageRepository.findAll({ where: { id_order: getOrdersSupDto.id_order } });
                return orderSupAllByOrder;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrdersSupStorageByOrdSup(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupAllByOrderSup = yield this.ordersSupStorageRepository.findOne({ where: { order_sup_index: getOrdersSupDto.id_order_sup } });
                return orderSupAllByOrderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersSupStorageByOrdSup(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupAllByOrderSup = yield this.ordersSupStorageRepository.findAll({ where: { id_order_sup: getOrdersSupDto.id_order_sup } });
                return orderSupAllByOrderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderSupStorageById(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupId = yield this.ordersSupStorageRepository.findByPk(getOrdersSupDto.id_order_sup, { include: { all: true } });
                return orderSupId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateOrderSupStorage(updateOrdersSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageUpdate = yield this.ordersSupStorageRepository.update({ id: updateOrdersSupplierDto.id,
                    order_sup_index: updateOrdersSupplierDto.order_sup_index,
                    storage_index: updateOrdersSupplierDto.storage_index,
                    id_order_sup: updateOrdersSupplierDto.id_order_sup,
                    id_storage: updateOrdersSupplierDto.id_storage,
                    quantity: updateOrdersSupplierDto.quantity,
                    price: updateOrdersSupplierDto.price,
                    price_wholesale: updateOrdersSupplierDto.price_wholesale
                }, { where: { id_order_sup_storage: updateOrdersSupplierDto.id_order_sup_storage } });
                return orderStorageUpdate;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeOrderSupStorage(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.ordersSupStorageRepository.destroy({ where: { id_order_sup: getOrdersSupDto.id_order_sup } });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
OrdersSupStorageService = __decorate([
    Injectable(),
    __param(0, InjectModel(OrdersSupStorage)),
    __metadata("design:paramtypes", [Object, OrdersService])
], OrdersSupStorageService);
export { OrdersSupStorageService };
