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
import { PriceTyresService } from './price-tyres.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
let PriceTyresController = class PriceTyresController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    create(createPriceDto) {
        return this.pricesService.createPriceTyres(createPriceDto);
    }
    findAll() {
        return this.pricesService.findAllTyres();
    }
    findPriceTyresById(getPriceDto) {
        return this.pricesService.findPriceTyresById(getPriceDto);
    }
    update(updatePriceDto) {
        return this.pricesService.updatePriceTyres(updatePriceDto);
    }
    remove(getPriceDto) {
        return this.pricesService.removePrice(getPriceDto);
    }
};
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePriceDto]),
    __metadata("design:returntype", void 0)
], PriceTyresController.prototype, "create", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PriceTyresController.prototype, "findAll", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPriceDto]),
    __metadata("design:returntype", void 0)
], PriceTyresController.prototype, "findPriceTyresById", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePriceTyresDto]),
    __metadata("design:returntype", void 0)
], PriceTyresController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPriceDto]),
    __metadata("design:returntype", void 0)
], PriceTyresController.prototype, "remove", null);
PriceTyresController = __decorate([
    Controller('price/tyres'),
    __metadata("design:paramtypes", [PriceTyresService])
], PriceTyresController);
export { PriceTyresController };
