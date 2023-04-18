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
import { WheelsService } from '../../wheels/wheels.service';
import { WheelBrand } from '../entities/wheels/wheel-brand.model';
let PropsWheelBrandService = class PropsWheelBrandService {
    constructor(wheelBrandRepository, wheelsService) {
        this.wheelBrandRepository = wheelBrandRepository;
        this.wheelsService = wheelsService;
    }
    createWheelBrand(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelBrand = yield this.wheelBrandRepository.findOne({ where: { brand: createPropertyDto.brand } });
                if (wheelId && wheelBrand) {
                    const updateBrand = yield this.wheelBrandRepository.update({
                        brand: createPropertyDto.brand
                    }, { where: { id_brand: wheelBrand.id_brand } });
                    yield wheelId.$set('brand', updateBrand);
                    return updateBrand;
                }
                else if (wheelId && !wheelBrand) {
                    const newWheelBrand = yield this.wheelBrandRepository.create(createPropertyDto);
                    yield wheelId.$set('brand', newWheelBrand);
                    return newWheelBrand;
                }
                else {
                    const wheelBrand = yield this.wheelBrandRepository.create(createPropertyDto);
                    return wheelBrand;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelBrandFromPrice(id, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelBrand, created] = yield this.wheelBrandRepository.findOrCreate({ where: { brand: brand },
                    defaults: { brand: brand }
                });
                if (created || !created) {
                    yield wheelBrand.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelBrand() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllBrand = yield this.wheelBrandRepository.findAll({ include: { all: true } });
                return wheelAllBrand;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelBrandById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandId = yield this.wheelBrandRepository.findByPk(getPropertyDto.id_brand, { include: { all: true } });
                return brandId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelBrand(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandWheelId = yield this.wheelBrandRepository.findByPk(updatePropertyDto.id_brand, { include: { all: true } });
                if (brandWheelId) {
                    const updateBrand = yield this.wheelBrandRepository.update({ brand: updatePropertyDto.brand }, { where: { id_brand: updatePropertyDto.id_brand } });
                    return updateBrand;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelBrand(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelBrands = yield this.wheelBrandRepository.destroy({ where: { id_brand: getPropertyDto.id_brand } });
                return removeWheelBrands;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelBrandService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelBrand)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelBrandService);
export { PropsWheelBrandService };