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
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
let OrdersSuppliersController = class OrdersSuppliersController {
    constructor(ordersSuppliersService) {
        this.ordersSuppliersService = ordersSuppliersService;
    }
    createOrderSup(createOrdersSupplierDto) {
        return this.ordersSuppliersService.createOrderSup(createOrdersSupplierDto);
    }
    addGoodsToOrderSup(createOrdersSupplierDto) {
        return this.ordersSuppliersService.addGoodsToOrderSup(createOrdersSupplierDto);
    }
    addGoodsToStock(createOrdersSupplierDto) {
        return this.ordersSuppliersService.addGoodsToStock(createOrdersSupplierDto);
    }
    findAll() {
        return this.ordersSuppliersService.findAllOrdersSup();
    }
    findOne(getOrdersSupDto) {
        return this.ordersSuppliersService.findOrderSupById(getOrdersSupDto);
    }
    update(id, updateOrdersSupplierDto) {
        return this.ordersSuppliersService.update(+id, updateOrdersSupplierDto);
    }
    remove(getOrdersSupDto) {
        return this.ordersSuppliersService.removeOrderSup(getOrdersSupDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrdersSupplierDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "createOrderSup", null);
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrdersSupplierDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "addGoodsToOrderSup", null);
__decorate([
    Post('/add/stock'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrdersSupplierDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "addGoodsToStock", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOrdersSuppliersDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateOrdersSupplierDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOrdersSuppliersDto]),
    __metadata("design:returntype", void 0)
], OrdersSuppliersController.prototype, "remove", null);
OrdersSuppliersController = __decorate([
    Controller('orders-suppliers'),
    __metadata("design:paramtypes", [OrdersSuppliersService])
], OrdersSuppliersController);
export { OrdersSuppliersController };
