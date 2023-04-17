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
import { WheelColor } from '../entities/wheels/wheel-color.model';
let PropsWheelColorService = class PropsWheelColorService {
    constructor(wheelColorRepository, wheelsService) {
        this.wheelColorRepository = wheelColorRepository;
        this.wheelsService = wheelsService;
    }
    createWheelColor(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelColor = yield this.wheelColorRepository.findOne({ where: { color: createPropertyDto.color } });
                if (wheelId && wheelColor) {
                    const updateColor = yield this.wheelColorRepository.update({
                        color: createPropertyDto.color,
                        color_short: createPropertyDto.color_short
                    }, { where: { id_color: wheelColor.id_color } });
                    yield wheelId.$set('color', updateColor);
                    return updateColor;
                }
                else if (wheelId && !wheelColor) {
                    const newWheelColor = yield this.wheelColorRepository.create(createPropertyDto);
                    yield wheelId.$set('color', newWheelColor);
                    return newWheelColor;
                }
                else {
                    const wheelColor = yield this.wheelColorRepository.create(createPropertyDto);
                    return wheelColor;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelColorFromPrice(id, id_color, color, color_short) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelColor, created] = yield this.wheelColorRepository.findOrCreate({ where: { id_color: id_color },
                    defaults: { id_color: id_color,
                        color: color,
                        color_short: color_short
                    }
                });
                if (created || !created) {
                    yield wheelColor.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelColor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllColor = yield this.wheelColorRepository.findAll({ include: { all: true } });
                return wheelAllColor;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelColorById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorId = yield this.wheelColorRepository.findByPk(getPropertyDto.id_color, { include: { all: true } });
                return colorId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelColor(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorWheelId = yield this.wheelColorRepository.findByPk(updatePropertyDto.id_color, { include: { all: true } });
                if (colorWheelId) {
                    const updateColor = yield this.wheelColorRepository.update({ color: updatePropertyDto.color,
                        color_short: updatePropertyDto.color_short }, { where: { id_color: updatePropertyDto.id_color } });
                    return updateColor;
                }
                return new HttpException(`Data "id_color" or "color" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelColor(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelColors = yield this.wheelColorRepository.destroy({ where: { id_color: getPropertyDto.id_color } });
                return removeWheelColors;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelColorService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelColor)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelColorService);
export { PropsWheelColorService };
