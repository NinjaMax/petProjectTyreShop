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
import { Order_Storage } from '../orders/entities/order-storage.model';
let OrdersStorageService = class OrdersStorageService {
    constructor(ordersStorageRepository) {
        this.ordersStorageRepository = ordersStorageRepository;
    }
    createOrderStorage(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorage = yield this.ordersStorageRepository.create(createOrderDto);
                return orderStorage;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageAll = yield this.ordersStorageRepository.findAll({
                    include: { all: true },
                });
                return orderStorageAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersStorageId(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageAllId = yield this.ordersStorageRepository.findAll({
                    where: { id_order: getOrdersDto.id_order },
                });
                return orderStorageAllId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderStorageById(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupId = yield this.ordersStorageRepository.findByPk(getOrdersDto.id_order_storage, { include: { all: true } });
                return orderSupId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderStorageOne(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageOne = yield this.ordersStorageRepository.findOne({
                    where: { id_order_storage: getOrdersDto.id_order_storage },
                });
                return orderStorageOne;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllGoodsOrderStorage(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageOne = yield this.ordersStorageRepository.findAll({
                    where: { id_order: getOrdersDto.id_order },
                });
                return orderStorageOne;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateOrderStorage(updateOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderStorageUpdate = yield this.ordersStorageRepository.update({
                    id: updateOrderDto.id,
                    order_index: updateOrderDto.order_index,
                    storage_index: updateOrderDto.storage_index,
                    quantity: updateOrderDto.quantity,
                    price: updateOrderDto.price,
                    id_supplier: updateOrderDto.id_supplier,
                }, { where: { id_order_storage: updateOrderDto.id_order_storage } });
                return orderStorageUpdate;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeOrderSup(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.ordersStorageRepository.destroy({
                    where: { id_order_storage: getOrdersDto.id_order_storage },
                });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
OrdersStorageService = __decorate([
    Injectable(),
    __param(0, InjectModel(Order_Storage)),
    __metadata("design:paramtypes", [Object])
], OrdersStorageService);
export { OrdersStorageService };
