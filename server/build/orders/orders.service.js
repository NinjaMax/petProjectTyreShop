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
import { Orders } from './entities/order.model';
import { OrdersStorageService } from './orders-storage.service';
import { BasketService } from '../basket/basket.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { StorageService } from '../storage/storage.service';
let OrdersService = class OrdersService {
    constructor(ordersRepository, basketService, stockTyresService, stockWheelsService, stockBatteriesService, stockOilsService, storageService, ordersStorageService) {
        this.ordersRepository = ordersRepository;
        this.basketService = basketService;
        this.stockTyresService = stockTyresService;
        this.stockWheelsService = stockWheelsService;
        this.stockBatteriesService = stockBatteriesService;
        this.stockOilsService = stockOilsService;
        this.storageService = storageService;
        this.ordersStorageService = ordersStorageService;
    }
    createOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const basket = yield this.basketService.findBasketById(createOrderDto);
            const order = yield this.ordersRepository.create(createOrderDto);
            if (basket) {
                const orderId = yield this.ordersRepository.findByPk(order.id_order);
                yield basket.$set('order', orderId.id_order);
                basket.order = orderId;
                return orderId;
            }
            return order;
        });
    }
    findAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderAll = yield this.ordersRepository.findAll({
                    include: { all: true },
                });
                return orderAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderById(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = yield this.ordersRepository.findByPk(getOrdersDto.id_order, {
                    include: { all: true },
                });
                return orderId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOrderByCustomer(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderCustomer = yield this.ordersRepository.findOne({
                    where: { id_customer: getOrdersDto.id_customer },
                });
                return orderCustomer;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createGoodsToOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (createOrderDto.id_order_storage) {
                    yield this.ordersStorageService.updateOrderStorage(createOrderDto);
                    const findGoodsToOrder = yield this.ordersStorageService.findOrderStorageOne(createOrderDto);
                    return findGoodsToOrder;
                }
                else {
                    const orderStorage = yield this.ordersStorageService.createOrderStorage(createOrderDto);
                    return orderStorage;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    tyreStockOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderIdTyre = yield this.ordersRepository.findByPk(createOrderDto.id_order, { include: { all: true } });
            const tyreStock = yield this.stockTyresService.findStockTyreById(createOrderDto);
            const storageTyreStorage = yield this.storageService.findStorageByIdOrder(createOrderDto);
            const orderStorageIdTyre = yield this.ordersStorageService.findOrderStorageById(createOrderDto);
            let stockTyreExists = null;
            let newReserveTyre = 0;
            if (tyreStock) {
                if (tyreStock.remainder < createOrderDto.quantity && tyreStock.stock !== 0) {
                    newReserveTyre = createOrderDto.quantity - (createOrderDto.quantity - tyreStock.remainder);
                    stockTyreExists = tyreStock;
                }
                else if (tyreStock.remainder >= createOrderDto.quantity && tyreStock.stock !== 0) {
                    stockTyreExists = tyreStock;
                }
                else {
                    throw new HttpException(`Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`, HttpStatus.BAD_REQUEST);
                }
            }
            if (stockTyreExists) {
                yield stockTyreExists.increment('reserve', { by: newReserveTyre || createOrderDto.quantity });
                yield orderStorageIdTyre.increment('reserve', { by: newReserveTyre || createOrderDto.quantity });
                yield orderIdTyre.$add('order_storage', orderStorageIdTyre);
                yield storageTyreStorage.$add('order_storage', orderStorageIdTyre);
            }
            yield orderIdTyre.reload();
            return orderIdTyre;
        });
    }
    wheelStockOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderIdWheel = yield this.ordersRepository.findByPk(createOrderDto.id_order, { include: { all: true } });
            const wheelStock = yield this.stockWheelsService.findStockWheelById(createOrderDto);
            const storageStorageWheel = yield this.storageService.findStorageById(createOrderDto);
            const orderStorageIdWheel = yield this.ordersStorageService.findOrderStorageById(createOrderDto);
            let stockWheelExists = null;
            let newReserveWheel = 0;
            if (wheelStock) {
                if (wheelStock.remainder < createOrderDto.quantity && wheelStock.stock !== 0) {
                    newReserveWheel = createOrderDto.quantity - (createOrderDto.quantity - wheelStock.remainder);
                    stockWheelExists = wheelStock;
                }
                else if (wheelStock.remainder >= createOrderDto.quantity && wheelStock.stock !== 0) {
                    stockWheelExists = wheelStock;
                }
                else {
                    throw new HttpException(`Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`, HttpStatus.BAD_REQUEST);
                }
            }
            if (stockWheelExists) {
                yield stockWheelExists.increment('reserve', { by: newReserveWheel || createOrderDto.quantity });
                yield orderStorageIdWheel.increment('reserve', { by: newReserveWheel || createOrderDto.quantity });
                yield orderIdWheel.$add('order_storage', orderStorageIdWheel);
                yield storageStorageWheel.$add('order_storage', orderStorageIdWheel);
            }
            yield orderIdWheel.reload();
            return orderIdWheel;
        });
    }
    batteryStockOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderIdBattery = yield this.ordersRepository.findByPk(createOrderDto.id_order, { include: { all: true } });
            const batteryStock = yield this.stockBatteriesService.findStockBatteryById(createOrderDto);
            const storageStorageBattery = yield this.storageService.findStorageById(createOrderDto);
            const orderStorageIdBattery = yield this.ordersStorageService.findOrderStorageById(createOrderDto);
            let stockBatteryExists = null;
            let newReserveBattery = 0;
            if (batteryStock) {
                if (batteryStock.remainder < createOrderDto.quantity && batteryStock.stock !== 0) {
                    newReserveBattery = createOrderDto.quantity - (createOrderDto.quantity - batteryStock.remainder);
                    stockBatteryExists = batteryStock;
                }
                else if (batteryStock.remainder >= createOrderDto.quantity && batteryStock.stock !== 0) {
                    stockBatteryExists = batteryStock;
                }
                else {
                    throw new HttpException(`Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`, HttpStatus.BAD_REQUEST);
                }
            }
            if (stockBatteryExists) {
                yield stockBatteryExists.increment('reserve', { by: newReserveBattery || createOrderDto.quantity });
                yield orderStorageIdBattery.increment('reserve', { by: newReserveBattery || createOrderDto.quantity });
                yield orderIdBattery.$add('order_storage', orderStorageIdBattery);
                yield storageStorageBattery.$add('order_storage', orderStorageIdBattery);
            }
            yield orderIdBattery.reload();
            return orderIdBattery;
        });
    }
    oilStockOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderIdOil = yield this.ordersRepository.findByPk(createOrderDto.id_order, { include: { all: true } });
            const oilStock = yield this.stockOilsService.findStockOilById(createOrderDto);
            const storageStorageOil = yield this.storageService.findStorageById(createOrderDto);
            const orderStorageIdOil = yield this.ordersStorageService.findOrderStorageById(createOrderDto);
            let stockOilExists = null;
            let newReserveOil = 0;
            if (oilStock) {
                if (oilStock.remainder < createOrderDto.quantity && oilStock.stock !== 0) {
                    newReserveOil = createOrderDto.quantity - (createOrderDto.quantity - oilStock.remainder);
                    stockOilExists = oilStock;
                }
                else if (oilStock.remainder >= createOrderDto.quantity && oilStock.stock !== 0) {
                    stockOilExists = oilStock;
                }
                else {
                    throw new HttpException(`Ви не можете поставити резерв, томущо немає залишків ("Залишки 0"), або не вірно вказаний склад чи інша помилка.`, HttpStatus.BAD_REQUEST);
                }
            }
            if (stockOilExists) {
                yield stockOilExists.increment('reserve', { by: newReserveOil || createOrderDto.quantity });
                yield orderStorageIdOil.increment('reserve', { by: newReserveOil || createOrderDto.quantity });
                yield orderIdOil.$add('order_storage', orderStorageIdOil);
                yield storageStorageOil.$add('order_storage', orderStorageIdOil);
            }
            yield orderIdOil.reload();
            return orderIdOil;
        });
    }
    addGoodsToOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tyreStock = yield this.stockTyresService.findStockTyreById(createOrderDto);
            const wheelStock = yield this.stockWheelsService.findStockWheelById(createOrderDto);
            const batteryStock = yield this.stockBatteriesService.findStockBatteryById(createOrderDto);
            const oilStock = yield this.stockOilsService.findStockOilById(createOrderDto);
            if (tyreStock) {
                const orderAddTyre = yield this.tyreStockOrder(createOrderDto);
                return orderAddTyre;
            }
            if (wheelStock) {
                const orderAddWheel = yield this.wheelStockOrder(createOrderDto);
                return orderAddWheel;
            }
            if (batteryStock) {
                const orderAddBattery = yield this.batteryStockOrder(createOrderDto);
                return orderAddBattery;
            }
            if (oilStock) {
                const orderAddOil = yield this.oilStockOrder(createOrderDto);
                return orderAddOil;
            }
        });
    }
    updateOrder(updateOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordersId = yield this.ordersRepository.findByPk(updateOrderDto.id_order, { include: { all: true } });
                if (ordersId) {
                    yield this.ordersRepository.update({
                        id: updateOrderDto.id,
                        id_user: updateOrderDto.id_user,
                        notes: updateOrderDto.notes,
                    }, { where: { id_order: updateOrderDto.id_order } });
                    const orderAfterUpdate = yield this.ordersRepository.findByPk(updateOrderDto.id_order, { include: { all: true } });
                    return orderAfterUpdate;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeOrder(getOrdersDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeOrders = yield this.ordersRepository.destroy({
                    where: { id_order: getOrdersDto.id_order },
                });
                return removeOrders;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
OrdersService = __decorate([
    Injectable(),
    __param(0, InjectModel(Orders)),
    __metadata("design:paramtypes", [Object, BasketService,
        StockTyresService,
        StockWheelsService,
        StockBatteriesService,
        StockOilsService,
        StorageService,
        OrdersStorageService])
], OrdersService);
export { OrdersService };
