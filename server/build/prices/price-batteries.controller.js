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
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteryService } from './price-batteries.service';
let PriceBatteriesController = class PriceBatteriesController {
    constructor(priceBatteriesService) {
        this.priceBatteriesService = priceBatteriesService;
    }
    create(createPriceDto) {
        return this.priceBatteriesService.createPriceBatteries(createPriceDto);
    }
    findAll() {
        return this.priceBatteriesService.findAll();
    }
    findOne(getPriceDto) {
        return this.priceBatteriesService.findPriceBatteriesById(getPriceDto);
    }
    update(updatePriceDto) {
        return this.priceBatteriesService.updatePriceBattery(updatePriceDto);
    }
    remove(getPriceDto) {
        return this.priceBatteriesService.removePriceBattery(getPriceDto);
    }
};
__decorate([
    Post('/add'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePriceDto]),
    __metadata("design:returntype", void 0)
], PriceBatteriesController.prototype, "create", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PriceBatteriesController.prototype, "findAll", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPriceDto]),
    __metadata("design:returntype", void 0)
], PriceBatteriesController.prototype, "findOne", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePriceTyresDto]),
    __metadata("design:returntype", void 0)
], PriceBatteriesController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPriceDto]),
    __metadata("design:returntype", void 0)
], PriceBatteriesController.prototype, "remove", null);
PriceBatteriesController = __decorate([
    Controller('prices/battery'),
    __metadata("design:paramtypes", [PriceBatteryService])
], PriceBatteriesController);
export { PriceBatteriesController };
