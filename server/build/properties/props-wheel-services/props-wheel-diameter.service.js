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
import { WheelDiameter } from '../entities/wheels/wheel-diameter.model';
let PropsWheelDiameterService = class PropsWheelDiameterService {
    constructor(wheelDiameterRepository, wheelsService) {
        this.wheelDiameterRepository = wheelDiameterRepository;
        this.wheelsService = wheelsService;
    }
    createWheelDiameter(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelDiameter = yield this.wheelDiameterRepository.findOne({ where: { diameter: createPropertyDto.diameter } });
                if (wheelId && wheelDiameter) {
                    const updateDiameter = yield this.wheelDiameterRepository.update({
                        diameter: createPropertyDto.diameter
                    }, { where: { id_diameter: wheelDiameter.id_diameter } });
                    yield wheelId.$set('diameter', updateDiameter);
                    return updateDiameter;
                }
                else if (wheelId && !wheelDiameter) {
                    const newWheelDiameter = yield this.wheelDiameterRepository.create(createPropertyDto);
                    yield wheelId.$set('diameter', newWheelDiameter);
                    return newWheelDiameter;
                }
                else {
                    const wheelDiameter = yield this.wheelDiameterRepository.create(createPropertyDto);
                    return wheelDiameter;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelDiameterFromPrice(id, diameter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelDiameter, created] = yield this.wheelDiameterRepository.findOrCreate({ where: { diameter: diameter }, defaults: { diameter: diameter } });
                if (created || !created) {
                    yield wheelDiameter.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelDiameter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllDiameter = yield this.wheelDiameterRepository.findAll({ include: { all: true } });
                return wheelAllDiameter;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelDiameterById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diameterId = yield this.wheelDiameterRepository.findByPk(getPropertyDto.id_diameter, { include: { all: true } });
                return diameterId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelDiameter(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diameterWheelId = yield this.wheelDiameterRepository.findByPk(updatePropertyDto.id_color, { include: { all: true } });
                if (diameterWheelId) {
                    const updateDiameter = yield this.wheelDiameterRepository.update({ diameter: updatePropertyDto.diameter }, { where: { id_diameter: updatePropertyDto.id_diameter } });
                    return updateDiameter;
                }
                return new HttpException(`Data "id_diameter" or "diameter" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelDiameter(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelDiameters = yield this.wheelDiameterRepository.destroy({ where: { id_diameter: getPropertyDto.id_diameter } });
                return removeWheelDiameters;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelDiameterService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelDiameter)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelDiameterService);
export { PropsWheelDiameterService };
