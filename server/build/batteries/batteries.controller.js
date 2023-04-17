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
import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { GetBatteryDto } from './dto/get-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
let BatteriesController = class BatteriesController {
    constructor(batteriesService) {
        this.batteriesService = batteriesService;
    }
    create(createBatteryDto) {
        return this.batteriesService.createBattery(createBatteryDto);
    }
    findAll() {
        return this.batteriesService.findAllBatteries();
    }
    findOne(getBatteryDto) {
        return this.batteriesService.findBatteryById(getBatteryDto);
    }
    update(id, updateBatteryDto) {
        return this.batteriesService.update(id, updateBatteryDto);
    }
    remove(getBatteryDto) {
        return this.batteriesService.removeBattery(getBatteryDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBatteryDto]),
    __metadata("design:returntype", void 0)
], BatteriesController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BatteriesController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBatteryDto]),
    __metadata("design:returntype", void 0)
], BatteriesController.prototype, "findOne", null);
__decorate([
    Patch('/id'),
    __param(0, Param()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateBatteryDto]),
    __metadata("design:returntype", void 0)
], BatteriesController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBatteryDto]),
    __metadata("design:returntype", void 0)
], BatteriesController.prototype, "remove", null);
BatteriesController = __decorate([
    Controller('batteries'),
    __metadata("design:paramtypes", [BatteriesService])
], BatteriesController);
export { BatteriesController };
