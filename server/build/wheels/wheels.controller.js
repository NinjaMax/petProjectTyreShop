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
import { WheelsService } from './wheels.service';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';
let WheelsController = class WheelsController {
    constructor(wheelsService) {
        this.wheelsService = wheelsService;
    }
    create(createWheelDto) {
        return this.wheelsService.createWheel(createWheelDto);
    }
    findAll() {
        return this.wheelsService.findAllWheels();
    }
    findOne(getWheelDto) {
        return this.wheelsService.findWheelById(getWheelDto);
    }
    update(id, updateWheelDto) {
        return this.wheelsService.update(+id, updateWheelDto);
    }
    remove(getWheelDto) {
        return this.wheelsService.removeWheel(getWheelDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateWheelDto]),
    __metadata("design:returntype", void 0)
], WheelsController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WheelsController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetWheelDto]),
    __metadata("design:returntype", void 0)
], WheelsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateWheelDto]),
    __metadata("design:returntype", void 0)
], WheelsController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetWheelDto]),
    __metadata("design:returntype", void 0)
], WheelsController.prototype, "remove", null);
WheelsController = __decorate([
    Controller('wheels'),
    __metadata("design:paramtypes", [WheelsService])
], WheelsController);
export { WheelsController };
