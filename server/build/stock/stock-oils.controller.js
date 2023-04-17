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
import { StockOilsService } from './stock-oils.service';
let StockOilsController = class StockOilsController {
    constructor(stockOilsService) {
        this.stockOilsService = stockOilsService;
    }
    createStockOils(createStockDto) {
        return this.stockOilsService.createStockOils(createStockDto);
    }
    findAllStock() {
        return this.stockOilsService.findAllStock();
    }
    findStockOilById(getStockDto) {
        return this.stockOilsService.findStockOilById(getStockDto);
    }
    updateStockOil(updateStockDto) {
        return this.stockOilsService.updateStockOil(updateStockDto);
    }
    removeStockOil(getStockDto) {
        return this.stockOilsService.removeStockOil(getStockDto);
    }
};
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStockDto]),
    __metadata("design:returntype", void 0)
], StockOilsController.prototype, "createStockOils", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockOilsController.prototype, "findAllStock", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockOilsController.prototype, "findStockOilById", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateStockDto]),
    __metadata("design:returntype", void 0)
], StockOilsController.prototype, "updateStockOil", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockOilsController.prototype, "removeStockOil", null);
StockOilsController = __decorate([
    Controller('stock/oils'),
    __metadata("design:paramtypes", [StockOilsService])
], StockOilsController);
export { StockOilsController };
