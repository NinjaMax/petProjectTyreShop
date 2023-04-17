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
import { TyresService } from '../../tyres/tyres.service';
import { TyreBrand } from '../entities/tyres/tyre-brand.model';
let PropsBrandService = class PropsBrandService {
    constructor(tyreBrandRepository, tyresService) {
        this.tyreBrandRepository = tyreBrandRepository;
        this.tyresService = tyresService;
    }
    createTyreBrand(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                if (tyreId) {
                    const tyreBrand = yield this.tyreBrandRepository.create(createPropertyDto);
                    const createTyreBrand = yield this.tyreBrandRepository.findByPk(tyreBrand.id_brand, { include: { all: true } });
                    yield createTyreBrand.$add('tyres', [createPropertyDto.id]);
                    createTyreBrand.tyres.push(tyreId);
                    createTyreBrand.reload();
                    return createTyreBrand;
                }
                else {
                    const tyreBrand = yield this.tyreBrandRepository.create(createPropertyDto);
                    return tyreBrand;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreBrandFromPrice(id, id_brand, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreBrand, created] = yield this.tyreBrandRepository.findOrCreate({ where: { id_brand: id_brand },
                    defaults: { id_brand: id_brand, brand: brand }
                });
                if (created || !created) {
                    yield tyreBrand.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreBrand() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllBrand = yield this.tyreBrandRepository.findAll({ include: { all: true } });
                return tyreAllBrand;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findBrandById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandId = yield this.tyreBrandRepository.findByPk(getPropertyDto.id_brand, { include: { all: true } });
                return brandId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreBrand(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandTyresId = yield this.tyreBrandRepository.findByPk(updatePropertyDto.id_brand, { include: { all: true } });
                const tyresId = yield this.tyresService.findTyresById(updatePropertyDto);
                if (brandTyresId) {
                    yield this.tyreBrandRepository.update({ brand: updatePropertyDto.brand,
                        id_brand: updatePropertyDto.id_brand,
                        tyres: brandTyresId.tyres
                    }, { where: { id_brand: updatePropertyDto.id_brand } });
                    const updateBrand = brandTyresId.tyres.find(item => item.id == updatePropertyDto.id);
                    if (!updateBrand) {
                        yield brandTyresId.$add('tyres', [updatePropertyDto.id]);
                        brandTyresId.tyres.push(tyresId);
                    }
                    const updateTyreBrand = yield this.tyreBrandRepository.findByPk(updatePropertyDto.id_brand, { include: { all: true } });
                    return updateTyreBrand;
                }
                return new HttpException(`Data "id_brand" or "brand" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreBrand(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreBrands = yield this.tyreBrandRepository.destroy({ where: { id: getPropertyDto.id } });
                return removeTyreBrands;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsBrandService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreBrand)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsBrandService);
export { PropsBrandService };
