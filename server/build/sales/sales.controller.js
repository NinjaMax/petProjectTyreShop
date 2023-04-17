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
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
let SalesController = class SalesController {
    constructor(salesService) {
        this.salesService = salesService;
    }
    createSale(createSaleDto) {
        return this.salesService.createSale(createSaleDto);
    }
    addGoodsSale(createSaleDto) {
        return this.salesService.addGoodsSale(createSaleDto);
    }
    findAll() {
        return this.salesService.findAllSales();
    }
    findOne(getSaleDto) {
        return this.salesService.findSaleById(getSaleDto);
    }
    update(id, updateSaleDto) {
        return this.salesService.update(+id, updateSaleDto);
    }
    remove(getSaleDto) {
        return this.salesService.removeSale(getSaleDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createSale", null);
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "addGoodsSale", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "remove", null);
SalesController = __decorate([
    Controller('sales'),
    __metadata("design:paramtypes", [SalesService])
], SalesController);
export { SalesController };
