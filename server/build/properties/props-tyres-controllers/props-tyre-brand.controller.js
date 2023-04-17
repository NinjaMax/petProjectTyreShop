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
import { PropsBrandService } from '../props-tyres-services/props-tyre-brand.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
let PropertiesBrandController = class PropertiesBrandController {
    constructor(propertiesBrandService) {
        this.propertiesBrandService = propertiesBrandService;
    }
    create(createPropertyDto) {
        return this.propertiesBrandService.createTyreBrand(createPropertyDto);
    }
    findAll() {
        return this.propertiesBrandService.findAllTyreBrand();
    }
    findOne(getPropertyDto) {
        return this.propertiesBrandService.findBrandById(getPropertyDto);
    }
    update(updatePropertyDto) {
        return this.propertiesBrandService.updateTyreBrand(updatePropertyDto);
    }
    remove(getPropertyDto) {
        return this.propertiesBrandService.removeTyreBrand(getPropertyDto);
    }
};
__decorate([
    Post('/brand'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesBrandController.prototype, "create", null);
__decorate([
    Get('/allbrands'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesBrandController.prototype, "findAll", null);
__decorate([
    Get('/model/id'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesBrandController.prototype, "findOne", null);
__decorate([
    Patch('/brand/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesBrandController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesBrandController.prototype, "remove", null);
PropertiesBrandController = __decorate([
    Controller('properties'),
    __metadata("design:paramtypes", [PropsBrandService])
], PropertiesBrandController);
export { PropertiesBrandController };
