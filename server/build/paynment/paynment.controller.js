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
import { PaynmentService } from './paynment.service';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
let PaynmentController = class PaynmentController {
    constructor(paynmentService) {
        this.paynmentService = paynmentService;
    }
    create(createPaynmentDto) {
        return this.paynmentService.createPaynment(createPaynmentDto);
    }
    findAll() {
        return this.paynmentService.findAllPaynment();
    }
    findOne(getPaynmentDto) {
        return this.paynmentService.findPaynmentById(getPaynmentDto);
    }
    update(id, updatePaynmentDto) {
        return this.paynmentService.update(+id, updatePaynmentDto);
    }
    remove(getPaynmentDto) {
        return this.paynmentService.removePaynment(getPaynmentDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePaynmentDto]),
    __metadata("design:returntype", void 0)
], PaynmentController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaynmentController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPaynmentDto]),
    __metadata("design:returntype", void 0)
], PaynmentController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdatePaynmentDto]),
    __metadata("design:returntype", void 0)
], PaynmentController.prototype, "update", null);
__decorate([
    Delete('/id'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPaynmentDto]),
    __metadata("design:returntype", void 0)
], PaynmentController.prototype, "remove", null);
PaynmentController = __decorate([
    Controller('paynment'),
    __metadata("design:paramtypes", [PaynmentService])
], PaynmentController);
export { PaynmentController };
