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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.model';
let CategorysService = class CategorysService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    createCategory(createCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryRepository.create(createCategoryDto);
                return category;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createCategoryFromPrice(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [findCategory, created] = yield this.categoryRepository.findOrCreate({ where: { category: category }, defaults: { category: category } });
                if (created || !created) {
                    findCategory.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createCategoryWheelFromPrice(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [findCategory, created] = yield this.categoryRepository.findOrCreate({ where: { category: category }, defaults: { category: category } });
                if (created || !created) {
                    yield findCategory.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryAll = yield this.categoryRepository.findAll({ include: { all: true } });
                return categoryAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findCatById(getCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findCategoryById = yield this.categoryRepository.findByPk(getCategoryDto.id_cat, { include: { all: true } });
                return findCategoryById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    removeCategory(getCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeCategory = yield this.categoryRepository.destroy({ where: { id_cat: getCategoryDto.id_cat } });
                return removeCategory;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
CategorysService = __decorate([
    Injectable(),
    __param(0, InjectModel(Category)),
    __metadata("design:paramtypes", [Object])
], CategorysService);
export { CategorysService };
