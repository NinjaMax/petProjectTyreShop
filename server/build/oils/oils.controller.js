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
import { OilsService } from './oils.service';
import { CreateOilDto } from './dto/create-oil.dto';
import { GetOilDto } from './dto/get-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';
let OilsController = class OilsController {
    constructor(oilsService) {
        this.oilsService = oilsService;
    }
    create(createOilDto) {
        return this.oilsService.createOil(createOilDto);
    }
    findAll() {
        return this.oilsService.findAllOils();
    }
    findOne(getOilDto) {
        return this.oilsService.findOilById(getOilDto);
    }
    update(id, updateOilDto) {
        return this.oilsService.update(+id, updateOilDto);
    }
    remove(getOilDto) {
        return this.oilsService.removeOil(getOilDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOilDto]),
    __metadata("design:returntype", void 0)
], OilsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OilsController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOilDto]),
    __metadata("design:returntype", void 0)
], OilsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateOilDto]),
    __metadata("design:returntype", void 0)
], OilsController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetOilDto]),
    __metadata("design:returntype", void 0)
], OilsController.prototype, "remove", null);
OilsController = __decorate([
    Controller('oils'),
    __metadata("design:paramtypes", [OilsService])
], OilsController);
export { OilsController };
