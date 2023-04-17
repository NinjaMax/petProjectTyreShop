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
import { Sales } from './entities/sale.model';
import { SalesStorageService } from './sales-storage.service';
import { ContractService } from '../contract/contract.service';
import { OrdersStorageService } from '../orders/orders-storage.service';
import { OrdersService } from '../orders/orders.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
let SalesService = class SalesService {
    constructor(salesRepository, ordersService, ordersStorageService, salesStorageService, stockTyresService, stockWheelsService, stockBatteriesService, stockOilsService, contractService) {
        this.salesRepository = salesRepository;
        this.ordersService = ordersService;
        this.ordersStorageService = ordersStorageService;
        this.salesStorageService = salesStorageService;
        this.stockTyresService = stockTyresService;
        this.stockWheelsService = stockWheelsService;
        this.stockBatteriesService = stockBatteriesService;
        this.stockOilsService = stockOilsService;
        this.contractService = contractService;
    }
    createSale(createSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.ordersService.findOrderById(createSaleDto);
                if (order) {
                    const orderStorageGoods = yield this.ordersStorageService.
                        findAllGoodsOrderStorage(createSaleDto);
                    const newSale = yield this.salesRepository.create({ id_order: order.id_order,
                        delivery: order.delivery,
                        id_user: order.id_user,
                        notes: order.notes,
                    }, { fields: ["id_order", "delivery", "id_user",
                            "notes"] });
                    for (let j = 0; j < orderStorageGoods.length; j++) {
                        yield this.salesStorageService.createSalesStorageNew(orderStorageGoods[j].id, orderStorageGoods[j].id_order, orderStorageGoods[j].id_supplier, orderStorageGoods[j].quantity, orderStorageGoods[j].price, newSale.id_sale, orderStorageGoods[j].id_storage);
                    }
                    return newSale;
                }
                else {
                    const sale = yield this.salesRepository.create(createSaleDto);
                    return sale;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    addGoodsSale(createSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findSale = yield this.salesRepository.findByPk(createSaleDto.id_sale);
                const findSalesStorage = yield this.salesStorageService.
                    findAllSalesStorageByOrd(createSaleDto);
                const contractCustomer = yield this.contractService.
                    findContractById(createSaleDto);
                if (findSale || findSalesStorage) {
                    for (let i = 0; i < findSalesStorage.length; i++) {
                        let tyreStock = yield this.stockTyresService.
                            findStockTyreByIdForSale(findSalesStorage[i].id);
                        let wheelStock = yield this.stockWheelsService.
                            findStockWheelByIdForSale(findSalesStorage[i].id);
                        let batteryStock = yield this.stockBatteriesService.
                            findStockBatteryByIdForSale(findSalesStorage[i].id);
                        let oilStock = yield this.stockOilsService.
                            findStockOilByIdForSale(findSalesStorage[i].id);
                        findSalesStorage[i].id_storage = findSalesStorage[i].storage_index;
                        yield findSale.$add('sales_storage', findSalesStorage[i]);
                        yield contractCustomer.decrement('balance', { by: findSalesStorage[i].total });
                        yield contractCustomer.reload();
                        if (tyreStock) {
                            yield tyreStock.decrement(['stock', 'reserve'], { by: createSaleDto.quantity });
                            yield tyreStock.reload();
                        }
                        if (wheelStock) {
                            yield wheelStock.decrement(['stock', 'reserve'], { by: createSaleDto.quantity });
                            yield wheelStock.reload();
                        }
                        if (batteryStock) {
                            yield batteryStock.decrement(['stock', 'reserve'], { by: createSaleDto.quantity });
                            yield batteryStock.reload();
                        }
                        if (oilStock) {
                            yield oilStock.decrement(['stock', 'reserve'], { by: createSaleDto.quantity });
                            yield oilStock.reload();
                        }
                    }
                    return findSale;
                }
                return "ORDER DOESN'T EXIST";
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllSales() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleAll = yield this.salesRepository.findAll({ include: { all: true } });
                return saleAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findSaleById(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleById = yield this.salesRepository.findByPk(getSaleDto.id_sale, { include: { all: true } });
                return saleById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateSaleDto) {
        return `This action updates a #${id} sale`;
    }
    removeSale(getSaleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeSale = yield this.salesRepository.destroy({ where: { id_sale: getSaleDto.id_sale } });
                return removeSale;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
SalesService = __decorate([
    Injectable(),
    __param(0, InjectModel(Sales)),
    __metadata("design:paramtypes", [Object, OrdersService,
        OrdersStorageService,
        SalesStorageService,
        StockTyresService,
        StockWheelsService,
        StockBatteriesService,
        StockOilsService,
        ContractService])
], SalesService);
export { SalesService };
