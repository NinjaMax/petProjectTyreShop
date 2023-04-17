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
import { Basket } from './entities/basket.model';
let BasketService = class BasketService {
    constructor(basketRepository) {
        this.basketRepository = basketRepository;
    }
    createBasket(createBasketDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basket = yield this.basketRepository.create(createBasketDto);
                return basket;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllbasket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basketAll = yield this.basketRepository.findAll({ include: { all: true } });
                return basketAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findBasketById(getBasketDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basketId = yield this.basketRepository.findByPk(getBasketDto.id_basket, { include: { all: true } });
                return basketId;
            }
            catch (_a) {
                throw new HttpException(`Data ${getBasketDto.id_basket} is incorrect and must be uniq`, HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateBasketDto) {
        return `This action updates a #${id} basket`;
    }
    removeBasket(getBasketDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeBasket = yield this.basketRepository.destroy({ where: { id_basket: getBasketDto.id_basket } });
                return removeBasket;
            }
            catch (_a) {
                throw new HttpException(`Data ${getBasketDto.id_basket} is incorrect and must be uniq`, HttpStatus.NOT_FOUND);
            }
        });
    }
};
BasketService = __decorate([
    Injectable(),
    __param(0, InjectModel(Basket)),
    __metadata("design:paramtypes", [Object])
], BasketService);
export { BasketService };
