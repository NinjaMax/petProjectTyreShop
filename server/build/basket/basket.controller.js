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
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
let BasketController = class BasketController {
    constructor(basketService) {
        this.basketService = basketService;
    }
    create(createBasketDto) {
        return this.basketService.createBasket(createBasketDto);
    }
    findAll() {
        return this.basketService.findAllbasket();
    }
    findOne(getBasketDto) {
        return this.basketService.findBasketById(getBasketDto);
    }
    update(id, updateBasketDto) {
        return this.basketService.update(+id, updateBasketDto);
    }
    remove(getBasketDto) {
        return this.basketService.removeBasket(getBasketDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBasketDto]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "findAll", null);
__decorate([
    Get(),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBasketDto]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateBasketDto]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "update", null);
__decorate([
    Delete('remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBasketDto]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "remove", null);
BasketController = __decorate([
    Controller('basket'),
    __metadata("design:paramtypes", [BasketService])
], BasketController);
export { BasketController };
