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
import { WheelSizeDigits } from '../entities/wheels/wheel-sizeDigits.model';
let PropsWheelSizeDigitsService = class PropsWheelSizeDigitsService {
    constructor(wheelSizeDigitsRepository, wheelsService) {
        this.wheelSizeDigitsRepository = wheelSizeDigitsRepository;
        this.wheelsService = wheelsService;
    }
    createWheelSizeDigits(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelSizeDigits = yield this.wheelSizeDigitsRepository.findOne({ where: { size_only_digits: createPropertyDto.size_only_digits } });
                if (wheelId && wheelSizeDigits) {
                    const updateSizeDigits = yield this.wheelSizeDigitsRepository.update({
                        size_only_digits: createPropertyDto.size_only_digits
                    }, { where: { id_size_digits: wheelSizeDigits.id_size_digits } });
                    yield wheelId.$set('size_digits', updateSizeDigits);
                    return updateSizeDigits;
                }
                else if (wheelId && !wheelSizeDigits) {
                    const newWheelSizeDigits = yield this.wheelSizeDigitsRepository.create(createPropertyDto);
                    yield wheelId.$set('size_digits', newWheelSizeDigits);
                    return newWheelSizeDigits;
                }
                else {
                    const wheelSizeDigits = yield this.wheelSizeDigitsRepository.create(createPropertyDto);
                    return wheelSizeDigits;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelSizeDigitsFromPrice(id, size_only_digits) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelSize_only_digits, created] = yield this.wheelSizeDigitsRepository.findOrCreate({ where: { size_only_digits: size_only_digits },
                    defaults: { size_only_digits: size_only_digits } });
                if (created || !created) {
                    yield wheelSize_only_digits.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelSizeDigits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllSizeDigits = yield this.wheelSizeDigitsRepository.findAll({ include: { all: true } });
                return wheelAllSizeDigits;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelSizeDigitsById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizeDigitsId = yield this.wheelSizeDigitsRepository.findByPk(getPropertyDto.id_size_digits, { include: { all: true } });
                return sizeDigitsId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelSizeDigits(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizeDigitsWheelId = yield this.wheelSizeDigitsRepository.findByPk(updatePropertyDto.id_size_digits, { include: { all: true } });
                if (sizeDigitsWheelId) {
                    const updateSizeDigits = yield this.wheelSizeDigitsRepository.update({ size_only_digits: updatePropertyDto.size_only_digits }, { where: { id_size_digits: updatePropertyDto.id_size_digits } });
                    return updateSizeDigits;
                }
                return new HttpException(`Data "id_size_digits" or "size_digits" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelSizeDigits(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelSizeDigitss = yield this.wheelSizeDigitsRepository.destroy({ where: { id_size_digits: getPropertyDto.id_size_digits } });
                return removeWheelSizeDigitss;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelSizeDigitsService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelSizeDigits)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelSizeDigitsService);
export { PropsWheelSizeDigitsService };
