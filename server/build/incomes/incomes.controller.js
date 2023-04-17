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
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
let IncomesController = class IncomesController {
    constructor(incomesService) {
        this.incomesService = incomesService;
    }
    create(createIncomeDto) {
        return this.incomesService.createIncome(createIncomeDto);
    }
    findAll() {
        return this.incomesService.findAllIncome();
    }
    findOne(getIncomeDto) {
        return this.incomesService.findIncomeById(getIncomeDto);
    }
    update(id, updateIncomeDto) {
        return this.incomesService.update(+id, updateIncomeDto);
    }
    remove(getIncomeDto) {
        return this.incomesService.removeIncome(getIncomeDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomesController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IncomesController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomesController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetIncomeDto]),
    __metadata("design:returntype", void 0)
], IncomesController.prototype, "remove", null);
IncomesController = __decorate([
    Controller('incomes'),
    __metadata("design:paramtypes", [IncomesService])
], IncomesController);
export { IncomesController };
