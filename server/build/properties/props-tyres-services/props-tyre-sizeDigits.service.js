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
import { TyreSizeDigits } from '../entities/tyres/tyre-sizeDigits.model';
let PropsTyreSizeDigitsService = class PropsTyreSizeDigitsService {
    constructor(tyreCountryRepository, tyresService) {
        this.tyreCountryRepository = tyreCountryRepository;
        this.tyresService = tyresService;
    }
    createTyreSizeDigits(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreSizeDigits = yield this.tyreCountryRepository.findOne({ where: { size_only_digits: createPropertyDto.size_only_digits } });
                if (tyreId && tyreSizeDigits) {
                    const updateSizeDigits = yield this.tyreCountryRepository.update({
                        size_only_digits: createPropertyDto.size_only_digits
                    }, { where: { id_size_digits: tyreSizeDigits.id_size_digits } });
                    yield tyreId.$set('size_digits', updateSizeDigits);
                    return updateSizeDigits;
                }
                else if (tyreId && !tyreSizeDigits) {
                    const newTyreSizeDigits = yield this.tyreCountryRepository.create(createPropertyDto);
                    yield tyreId.$set('size_digits', newTyreSizeDigits);
                    return newTyreSizeDigits;
                }
                else {
                    const tyreSizeDigits = yield this.tyreCountryRepository.create(createPropertyDto);
                    return tyreSizeDigits;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreSizeDigitsFromPrice(id, size_only_digits) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreSizeDigits, created] = yield this.tyreCountryRepository.findOrCreate({ where: { size_only_digits: size_only_digits },
                    defaults: { size_only_digits: size_only_digits } });
                if (created || !created) {
                    yield tyreSizeDigits.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreSizeDigits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllSizeDigits = yield this.tyreCountryRepository.findAll({ include: { all: true } });
                return tyreAllSizeDigits;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreSizeDigitsyById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizeDigitsId = yield this.tyreCountryRepository.findByPk(getPropertyDto.id_size_digits, { include: { all: true } });
                return sizeDigitsId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreSizeDigits(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizeDigitsTyresId = yield this.tyreCountryRepository.findByPk(updatePropertyDto.id_size_digits, { include: { all: true } });
                if (sizeDigitsTyresId) {
                    const updateSizeDigits = yield this.tyreCountryRepository.update({ size_only_digits: updatePropertyDto.size_only_digits }, { where: { id_size_digits: updatePropertyDto.id_size_digits } });
                    return updateSizeDigits;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreSizeDigits(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreSizeDigit = yield this.tyreCountryRepository.destroy({ where: { id_size_digits: getPropertyDto.id_size_digits } });
                return removeTyreSizeDigit;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreSizeDigitsService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreSizeDigits)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreSizeDigitsService);
export { PropsTyreSizeDigitsService };
