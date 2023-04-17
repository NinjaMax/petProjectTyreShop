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
import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockWheelsService } from './stock-wheels.service';
let StockWheelsController = class StockWheelsController {
    constructor(stockWheelsService) {
        this.stockWheelsService = stockWheelsService;
    }
    createStockWheel(createStockDto) {
        return this.stockWheelsService.createStockWheel(createStockDto);
    }
    findAll() {
        return this.stockWheelsService.findAllStock();
    }
    findOne(getStockDto) {
        return this.stockWheelsService.findStockWheelById(getStockDto);
    }
    update(updateStockDto) {
        return this.stockWheelsService.updateStockWheel(updateStockDto);
    }
    remove(getStockDto) {
        return this.stockWheelsService.removeStockWheel(getStockDto);
    }
};
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStockDto]),
    __metadata("design:returntype", void 0)
], StockWheelsController.prototype, "createStockWheel", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockWheelsController.prototype, "findAll", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockWheelsController.prototype, "findOne", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateStockDto]),
    __metadata("design:returntype", void 0)
], StockWheelsController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockWheelsController.prototype, "remove", null);
StockWheelsController = __decorate([
    Controller('stock/wheels'),
    __metadata("design:paramtypes", [StockWheelsService])
], StockWheelsController);
export { StockWheelsController };
