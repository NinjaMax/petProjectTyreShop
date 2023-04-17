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
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
let CategorysController = class CategorysController {
    constructor(categorysService) {
        this.categorysService = categorysService;
    }
    create(createCategoryDto) {
        return this.categorysService.createCategory(createCategoryDto);
    }
    findAll() {
        return this.categorysService.findAllCategory();
    }
    findOne(getCategoryDto) {
        return this.categorysService.findCatById(getCategoryDto);
    }
    update(id, updateCategoryDto) {
        return this.categorysService.update(+id, updateCategoryDto);
    }
    remove(getCategoryDto) {
        return this.categorysService.removeCategory(getCategoryDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategorysController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategorysController.prototype, "findAll", null);
__decorate([
    Get('/id'),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCategoryDto]),
    __metadata("design:returntype", void 0)
], CategorysController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategorysController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCategoryDto]),
    __metadata("design:returntype", void 0)
], CategorysController.prototype, "remove", null);
CategorysController = __decorate([
    Controller('categories'),
    __metadata("design:paramtypes", [CategorysService])
], CategorysController);
export { CategorysController };
