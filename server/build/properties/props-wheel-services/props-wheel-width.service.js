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
import { WheelWidth } from '../entities/wheels/wheel-width.model';
let PropsWheelWidthService = class PropsWheelWidthService {
    constructor(wheelWidthRepository, wheelsService) {
        this.wheelWidthRepository = wheelWidthRepository;
        this.wheelsService = wheelsService;
    }
    createWheelWidth(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelWidth = yield this.wheelWidthRepository.findOne({ where: { width: createPropertyDto.width } });
                if (wheelId && wheelWidth) {
                    const updateWidth = yield this.wheelWidthRepository.update({
                        width: createPropertyDto.width
                    }, { where: { id_width: wheelWidth.id_width } });
                    yield wheelId.$set('width', updateWidth);
                    return updateWidth;
                }
                else if (wheelId && !wheelWidth) {
                    const newWheelWidth = yield this.wheelWidthRepository.create(createPropertyDto);
                    yield wheelId.$set('width', newWheelWidth);
                    return newWheelWidth;
                }
                else {
                    const wheelWidth = yield this.wheelWidthRepository.create(createPropertyDto);
                    return wheelWidth;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelWidthFromPrice(id, width) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelWidth, created] = yield this.wheelWidthRepository.findOrCreate({ where: { width: width }, defaults: { width: width } });
                if (created || !created) {
                    yield wheelWidth.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelWidth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllWidth = yield this.wheelWidthRepository.findAll({ include: { all: true } });
                return wheelAllWidth;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelWidthById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const widthId = yield this.wheelWidthRepository.findByPk(getPropertyDto.id_width, { include: { all: true } });
                return widthId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelWidth(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const widthWheelId = yield this.wheelWidthRepository.findByPk(updatePropertyDto.id_width, { include: { all: true } });
                if (widthWheelId) {
                    const updateWidth = yield this.wheelWidthRepository.update({ width: updatePropertyDto.width }, { where: { id_width: updatePropertyDto.id_width } });
                    return updateWidth;
                }
                return new HttpException(`Data "id_width" or "width" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelWidth(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelWidths = yield this.wheelWidthRepository.destroy({ where: { id_width: getPropertyDto.id_width } });
                return removeWheelWidths;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelWidthService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelWidth)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelWidthService);
export { PropsWheelWidthService };
