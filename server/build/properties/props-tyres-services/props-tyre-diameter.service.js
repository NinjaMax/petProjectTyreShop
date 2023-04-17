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
import { TyreDiameter } from '../entities/tyres/tyre-diameter.model';
let PropsTyrDiametrService = class PropsTyrDiametrService {
    constructor(tyreDiameterRepository, tyresService) {
        this.tyreDiameterRepository = tyreDiameterRepository;
        this.tyresService = tyresService;
    }
    createTyreDiameter(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreDiameter = yield this.tyreDiameterRepository.findOne({ where: { diameter: createPropertyDto.diameter } });
                if (tyreId && tyreDiameter) {
                    const updateDiameter = yield this.tyreDiameterRepository.update({
                        diameter: createPropertyDto.diameter
                    }, { where: { id_diameter: tyreDiameter.id_diameter } });
                    yield tyreId.$set('diameter', updateDiameter);
                    return updateDiameter;
                }
                else if (tyreId && !tyreDiameter) {
                    const newTyreDiameter = yield this.tyreDiameterRepository.create(createPropertyDto);
                    yield tyreId.$set('diameter', newTyreDiameter);
                    return newTyreDiameter;
                }
                else {
                    const tyreCountry = yield this.tyreDiameterRepository.create(createPropertyDto);
                    return tyreCountry;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreDiameterFromPrice(id, diameter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreDiameter, created] = yield this.tyreDiameterRepository.findOrCreate({ where: { diameter: diameter }, defaults: { diameter: diameter } });
                if (created || !created) {
                    yield tyreDiameter.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreDiameter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllDiameter = yield this.tyreDiameterRepository.findAll({ include: { all: true } });
                return tyreAllDiameter;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreDiameterById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandId = yield this.tyreDiameterRepository.findByPk(getPropertyDto.id_diameter, { include: { all: true } });
                return brandId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreDiameter(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countryTyresId = yield this.tyreDiameterRepository.findByPk(updatePropertyDto.id_diameter, { include: { all: true } });
                if (countryTyresId) {
                    const updateDiameter = yield this.tyreDiameterRepository.update({ diameter: updatePropertyDto.diameter }, { where: { id_diameter: updatePropertyDto.id_diameter } });
                    return updateDiameter;
                }
                return new HttpException(`Data "id_diameter" or "diameter" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreDiameter(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreDiameters = yield this.tyreDiameterRepository.destroy({ where: { id_diameter: getPropertyDto.id_diameter } });
                return removeTyreDiameters;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyrDiametrService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreDiameter)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyrDiametrService);
export { PropsTyrDiametrService };
