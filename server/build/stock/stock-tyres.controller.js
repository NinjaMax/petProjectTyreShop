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
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, } from '@nestjs/common';
import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
let StockTyresController = class StockTyresController {
    constructor(stockTyresService) {
        this.stockTyresService = stockTyresService;
    }
    createStockTyre(createStockDto) {
        return this.stockTyresService.createStockTyre(createStockDto);
    }
    findAllStock() {
        return this.stockTyresService.findAllStock();
    }
    findStockTyreById(getStockDto) {
        return this.stockTyresService.findStockTyreById(getStockDto);
    }
    findStockTyreParamId(id) {
        return this.stockTyresService.findStockTyreParamId(id);
    }
    updateStockTyres(updateStockDto) {
        return this.stockTyresService.updateStockTyres(updateStockDto);
    }
    removeStockTyre(getStockDto) {
        return this.stockTyresService.removeStockTyre(getStockDto);
    }
};
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStockDto]),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "createStockTyre", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "findAllStock", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "findStockTyreById", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "findStockTyreParamId", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateStockDto]),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "updateStockTyres", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStockDto]),
    __metadata("design:returntype", void 0)
], StockTyresController.prototype, "removeStockTyre", null);
StockTyresController = __decorate([
    Controller('/stock/tyres'),
    __metadata("design:paramtypes", [StockTyresService])
], StockTyresController);
export { StockTyresController };
