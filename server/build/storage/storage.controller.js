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
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { GetStorageDto } from './dto/get-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    create(createStorageDto) {
        return this.storageService.createStorage(createStorageDto);
    }
    findAllStorage() {
        return this.storageService.findAllStorage();
    }
    findAllStorageStock() {
        return this.storageService.findAllStorageStock();
    }
    findOne(getStorageDto) {
        return this.storageService.findStorageById(getStorageDto);
    }
    update(id, updateStorageDto) {
        return this.storageService.update(+id, updateStorageDto);
    }
    remove(getStorageDto) {
        return this.storageService.removeStorage(getStorageDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "create", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "findAllStorage", null);
__decorate([
    Get('/stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "findAllStorageStock", null);
__decorate([
    Get('/id'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateStorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetStorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "remove", null);
StorageController = __decorate([
    Controller('storage'),
    __metadata("design:paramtypes", [StorageService])
], StorageController);
export { StorageController };
