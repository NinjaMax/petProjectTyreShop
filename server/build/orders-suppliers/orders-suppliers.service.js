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
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';
import { ContractService } from '../contract/contract.service';
import { OrdersStorageService } from '../orders/orders-storage.service';
import { OrdersService } from '../orders/orders.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
let OrdersSuppliersService = class OrdersSuppliersService {
    constructor(ordersSupRepository, ordersService, ordersSupStorageService, ordersStorageService, stockTyresService, stockBatteriesService, stockOilsService, stockWheelsService, contractService) {
        this.ordersSupRepository = ordersSupRepository;
        this.ordersService = ordersService;
        this.ordersSupStorageService = ordersSupStorageService;
        this.ordersStorageService = ordersStorageService;
        this.stockTyresService = stockTyresService;
        this.stockBatteriesService = stockBatteriesService;
        this.stockOilsService = stockOilsService;
        this.stockWheelsService = stockWheelsService;
        this.contractService = contractService;
    }
    createOrderSup(createOrdersSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.ordersService.findOrderById(createOrdersSupplierDto);
                if (order) {
                    const orderGoods = yield this.ordersStorageService.findAllGoodsOrderStorage(createOrdersSupplierDto);
                    const ordersGoodsIdSup = orderGoods.map(item => item.id_supplier);
                    const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
                    for (let i = 0; i < idSuppliers.length; i++) {
                        yield this.ordersSupRepository.create({ id_order: order.id_order,
                            id_supplier: idSuppliers[i],
                            id_contract: 0 }, { fields: ["id_order", "id_supplier",
                                "delivery", "status", "notes", "id_contract"] });
                    }
                    for (let j = 0; j < orderGoods.length; j++) {
                        yield this.ordersSupStorageService.createOrderSupStorageNew(orderGoods[j].id, orderGoods[j].id_order, orderGoods[j].id_supplier, orderGoods[j].quantity, orderGoods[j].price, orderGoods[j].storage_index);
                    }
                    const orderSupAll = yield this.ordersSupRepository.findAll({ include: { all: true } });
                    return orderSupAll;
                }
                else {
                    const orderSup = yield this.ordersSupRepository.create(createOrdersSupplierDto);
                    return orderSup;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    addGoodsToOrderSup(createOrdersSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findByOrderSup = yield this.ordersSupStorageService.
                    findOrdersSupStorageByOrdSup(createOrdersSupplierDto);
                const findByIdOrder = yield this.ordersSupStorageService.
                    findAllOrdersSupStorageByOrd(createOrdersSupplierDto);
                if (findByOrderSup) {
                    const orderSup = yield this.ordersSupRepository.findByPk(createOrdersSupplierDto.id_order_sup);
                    yield orderSup.$add('orders_sup_storage', findByOrderSup);
                    yield findByOrderSup.$add('storage', findByOrderSup.storage_index);
                    yield orderSup.reload();
                    return orderSup;
                }
                if (findByIdOrder) {
                    const orderSupByOrder = yield this.ordersSupRepository.
                        findAll({ where: { id_order: createOrdersSupplierDto.id_order } });
                    const ordersGoodsIdSup = findByIdOrder.map(item => item.id_supplier);
                    const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
                    for (let i = 0; i < idSuppliers.length; i++) {
                        let orderSupStorageGoods = findByIdOrder.filter(item => item.id_supplier == idSuppliers[i]);
                        let orderSup = yield this.ordersSupRepository.findOne({ where: { id_supplier: idSuppliers[i] } });
                        yield orderSup.$add('orders_sup_storage', orderSupStorageGoods);
                        yield orderSupStorageGoods[i].$add('storage', findByIdOrder[i].storage_index);
                    }
                    return orderSupByOrder;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    addGoodsToStock(createOrdersSupplierDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const goodsOrderSup = yield this.ordersSupStorageService.
                    findAllOrdersSupStorageByOrdSup(createOrdersSupplierDto);
                const contractSupplier = yield this.contractService.findContractById(createOrdersSupplierDto);
                for (let i = 0; i < goodsOrderSup.length; i++) {
                    let tyresStock = yield this.stockTyresService.
                        findStockTyreByIdForSale(goodsOrderSup[i].id);
                    let batteryStock = yield this.stockBatteriesService.
                        findStockBatteryByIdForSale(goodsOrderSup[i].id);
                    let oilStock = yield this.stockOilsService.
                        findStockOilByIdForSale(goodsOrderSup[i].id);
                    let wheelsStock = yield this.stockWheelsService.
                        findStockWheelByIdForSale(goodsOrderSup[i].id);
                    if (tyresStock) {
                        yield tyresStock.increment('stock', { by: goodsOrderSup[i].quantity });
                        yield contractSupplier.decrement('balance', { by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity });
                        goodsOrderSup[i].id_storage = null;
                        goodsOrderSup[i].save();
                        yield tyresStock.reload();
                        yield contractSupplier.reload();
                        return tyresStock;
                    }
                    if (batteryStock) {
                        yield batteryStock.increment('stock', { by: goodsOrderSup[i].quantity });
                        yield contractSupplier.decrement('balance', { by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity });
                        goodsOrderSup[i].id_storage = null;
                        goodsOrderSup[i].save();
                        yield batteryStock.reload();
                        yield contractSupplier.reload();
                        return batteryStock;
                    }
                    if (oilStock) {
                        yield oilStock.increment('stock', { by: goodsOrderSup[i].quantity });
                        yield contractSupplier.decrement('balance', { by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity });
                        goodsOrderSup[i].id_storage = null;
                        goodsOrderSup[i].save();
                        yield oilStock.reload();
                        yield contractSupplier.reload();
                        return oilStock;
                    }
                    if (wheelsStock) {
                        yield wheelsStock.increment('stock', { by: goodsOrderSup[i].quantity });
                        yield contractSupplier.decrement('balance', { by: goodsOrderSup[i].price_wholesale * goodsOrderSup[i].quantity });
                        goodsOrderSup[i].id_storage = null;
                        goodsOrderSup[i].save();
                        yield wheelsStock.reload();
                        yield contractSupplier.reload();
                        return wheelsStock;
                    }
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOrdersSup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupAll = yield this.ordersSupRepository.findAll({ include: { all: true } });
                return orderSupAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderSupById(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSupId = yield this.ordersSupRepository.findByPk(getOrdersSupDto.id_order_sup, { include: { all: true } });
                return orderSupId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateOrdersSupplierDto) {
        return `This action updates a #${id} ordersSupplier`;
    }
    removeOrderSup(getOrdersSupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderSup = yield this.ordersSupRepository.destroy({ where: { id_order_sup: getOrdersSupDto.id_order_sup } });
                return orderSup;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
OrdersSuppliersService = __decorate([
    Injectable(),
    __param(0, InjectModel(OrdersSupplier)),
    __metadata("design:paramtypes", [Object, OrdersService,
        OrdersSupStorageService,
        OrdersStorageService,
        StockTyresService,
        StockBatteriesService,
        StockOilsService,
        StockWheelsService,
        ContractService])
], OrdersSuppliersService);
export { OrdersSuppliersService };
