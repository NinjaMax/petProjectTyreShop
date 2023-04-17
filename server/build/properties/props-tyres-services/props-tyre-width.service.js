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
import { TyreWidth } from '../entities/tyres/tyre-width.model';
let PropsTyreWidthService = class PropsTyreWidthService {
    constructor(tyreCountryRepository, tyresService) {
        this.tyreCountryRepository = tyreCountryRepository;
        this.tyresService = tyresService;
    }
    createTyreWidth(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreWidth = yield this.tyreCountryRepository.findOne({ where: { width: createPropertyDto.width } });
                if (tyreId && tyreWidth) {
                    const updateWidth = yield this.tyreCountryRepository.update({
                        width: createPropertyDto.width
                    }, { where: { id_width: tyreWidth.id_width } });
                    yield tyreId.$set('width', updateWidth);
                    return updateWidth;
                }
                else if (tyreId && !tyreWidth) {
                    const newTyreWidth = yield this.tyreCountryRepository.create(createPropertyDto);
                    yield tyreId.$set('width', newTyreWidth);
                    return newTyreWidth;
                }
                else {
                    const tyreWidth = yield this.tyreCountryRepository.create(createPropertyDto);
                    return tyreWidth;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreWidthFromPrice(id, width) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreWidth, created] = yield this.tyreCountryRepository.findOrCreate({ where: { width: width }, defaults: { width: width } });
                if (created || !created) {
                    yield tyreWidth.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreWidth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllWidth = yield this.tyreCountryRepository.findAll({ include: { all: true } });
                return tyreAllWidth;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreWidthById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const widthId = yield this.tyreCountryRepository.findByPk(getPropertyDto.id_width, { include: { all: true } });
                return widthId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreWidth(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countryTyresId = yield this.tyreCountryRepository.findByPk(updatePropertyDto.id_width, { include: { all: true } });
                if (countryTyresId) {
                    const updateWidth = yield this.tyreCountryRepository.update({ width: updatePropertyDto.width }, { where: { id_width: updatePropertyDto.id_width } });
                    return updateWidth;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreWidth(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreWidths = yield this.tyreCountryRepository.destroy({ where: { id_width: getPropertyDto.id_width } });
                return removeTyreWidths;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreWidthService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreWidth)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreWidthService);
export { PropsTyreWidthService };
