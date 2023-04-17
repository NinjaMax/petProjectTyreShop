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
import { Controller, Get, Post, Body, Patch, Delete, Query, } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(createOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }
    addGoodsToOrder(createOrderDto) {
        return this.ordersService.addGoodsToOrder(createOrderDto);
    }
    createGoodsToOrder(createOrderDto) {
        return this.ordersService.createGoodsToOrder(createOrderDto);
    }
    findAllOrders() {
        return this.ordersService.findAllOrders();
    }
    findOrderById(getOrdersDto) {
        return this.ordersService.findOrderById(getOrdersDto);
    }
    updateOrder(updateOrderDto) {
        return this.ordersService.updateOrder(updateOrderDto);
    }
    removeOrder(getOrdersDto) {
        return this.ordersService.removeOrder(getOrdersDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addGoodsToOrder", null);
__decorate([
    Post('/creategoods'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createGoodsToOrder", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAllOrders", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOrdersDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOrderById", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateOrder", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOrdersDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "removeOrder", null);
OrdersController = __decorate([
    Controller('orders'),
    __metadata("design:paramtypes", [OrdersService])
], OrdersController);
export { OrdersController };
