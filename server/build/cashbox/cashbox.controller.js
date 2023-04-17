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
import { CashboxService } from './cashbox.service';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { GetCashboxDto } from './dto/get-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';
let CashboxController = class CashboxController {
    constructor(cashboxService) {
        this.cashboxService = cashboxService;
    }
    create(createCashboxDto) {
        return this.cashboxService.createCashbox(createCashboxDto);
    }
    findAll() {
        return this.cashboxService.findAllCashbox();
    }
    findOne(getCashboxDto) {
        return this.cashboxService.findCashboxById(getCashboxDto);
    }
    update(id, updateCashboxDto) {
        return this.cashboxService.update(+id, updateCashboxDto);
    }
    remove(getCashboxDto) {
        return this.cashboxService.removeCashbox(getCashboxDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCashboxDto]),
    __metadata("design:returntype", void 0)
], CashboxController.prototype, "create", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CashboxController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCashboxDto]),
    __metadata("design:returntype", void 0)
], CashboxController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCashboxDto]),
    __metadata("design:returntype", void 0)
], CashboxController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCashboxDto]),
    __metadata("design:returntype", void 0)
], CashboxController.prototype, "remove", null);
CashboxController = __decorate([
    Controller('cashbox'),
    __metadata("design:paramtypes", [CashboxService])
], CashboxController);
export { CashboxController };
