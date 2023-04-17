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
import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
let TyresController = class TyresController {
    constructor(tyresService) {
        this.tyresService = tyresService;
    }
    createTyres(createTyreDto) {
        return this.tyresService.createTyres(createTyreDto);
    }
    findAllTyres() {
        return this.tyresService.findAllTyres();
    }
    findTyresById(getTyreDto) {
        return this.tyresService.findTyresById(getTyreDto);
    }
    updateTyres(updateTyreDto) {
        return this.tyresService.updateTyres(updateTyreDto);
    }
    remove(getTyreDto) {
        return this.tyresService.remove(getTyreDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTyreDto]),
    __metadata("design:returntype", void 0)
], TyresController.prototype, "createTyres", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TyresController.prototype, "findAllTyres", null);
__decorate([
    Get('/id'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetTyreDto]),
    __metadata("design:returntype", void 0)
], TyresController.prototype, "findTyresById", null);
__decorate([
    Patch('/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateTyreDto]),
    __metadata("design:returntype", void 0)
], TyresController.prototype, "updateTyres", null);
__decorate([
    Delete('/delete'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetTyreDto]),
    __metadata("design:returntype", void 0)
], TyresController.prototype, "remove", null);
TyresController = __decorate([
    Controller('tyres'),
    __metadata("design:paramtypes", [TyresService])
], TyresController);
export { TyresController };
