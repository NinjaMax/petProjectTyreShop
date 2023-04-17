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
import { PropsModelService } from '../props-tyres-services/props-tyre-model.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
let PropertiesModelController = class PropertiesModelController {
    constructor(propertiesModelService) {
        this.propertiesModelService = propertiesModelService;
    }
    create(createPropertyDto) {
        return this.propertiesModelService.createTyreModel(createPropertyDto);
    }
    findAll() {
        return this.propertiesModelService.findAllTyreModel();
    }
    findOne(getPropertyDto) {
        return this.propertiesModelService.findModelById(getPropertyDto);
    }
    update(updatePropertyDto) {
        return this.propertiesModelService.updateTyreModel(updatePropertyDto);
    }
    remove(getPropertyDto) {
        return this.propertiesModelService.removeTyreModel(getPropertyDto);
    }
};
__decorate([
    Post('/model'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesModelController.prototype, "create", null);
__decorate([
    Get('/allmodels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesModelController.prototype, "findAll", null);
__decorate([
    Get('/model/id'),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesModelController.prototype, "findOne", null);
__decorate([
    Patch('/model/update'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesModelController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesModelController.prototype, "remove", null);
PropertiesModelController = __decorate([
    Controller('properties'),
    __metadata("design:paramtypes", [PropsModelService])
], PropertiesModelController);
export { PropertiesModelController };
