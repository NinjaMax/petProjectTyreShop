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
import { WheelBoltCount } from '../entities/wheels/wheel-boltCount.model';
let PropsWheelBoltCountService = class PropsWheelBoltCountService {
    constructor(wheelBoltCountRepository, wheelsService) {
        this.wheelBoltCountRepository = wheelBoltCountRepository;
        this.wheelsService = wheelsService;
    }
    createWheelBoltCount(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelBoltCount = yield this.wheelBoltCountRepository.findOne({ where: { bolt_count: createPropertyDto.bolt_count } });
                if (wheelId && wheelBoltCount) {
                    const updateBoltCount = yield this.wheelBoltCountRepository.update({
                        bolt_count: createPropertyDto.bolt_count
                    }, { where: { id_bolt_count: wheelBoltCount.id_bolt_count } });
                    yield wheelId.$set('bolt_count', updateBoltCount);
                    return updateBoltCount;
                }
                else if (wheelId && !wheelBoltCount) {
                    const newWheelBoltCount = yield this.wheelBoltCountRepository.create(createPropertyDto);
                    yield wheelId.$set('bolt_count', newWheelBoltCount);
                    return newWheelBoltCount;
                }
                else {
                    const wheelBoltCount = yield this.wheelBoltCountRepository.create(createPropertyDto);
                    return wheelBoltCount;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelBoltCountFromPrice(id, bolt_count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelBoltCount, created] = yield this.wheelBoltCountRepository.findOrCreate({ where: { bolt_count: bolt_count },
                    defaults: { bolt_count: bolt_count }
                });
                if (created || !created) {
                    yield wheelBoltCount.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelBoltCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllBoltCount = yield this.wheelBoltCountRepository.findAll({ include: { all: true } });
                return wheelAllBoltCount;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelBoltCountById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boltCountId = yield this.wheelBoltCountRepository.findByPk(getPropertyDto.id_bolt_count, { include: { all: true } });
                return boltCountId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelBoltCount(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boltCountWheelId = yield this.wheelBoltCountRepository.findByPk(updatePropertyDto.id_bolt_count, { include: { all: true } });
                if (boltCountWheelId) {
                    const updateBoltCount = yield this.wheelBoltCountRepository.update({ bolt_count: updatePropertyDto.bolt_count }, { where: { id_bolt_count: updatePropertyDto.id_bolt_count } });
                    return updateBoltCount;
                }
                return new HttpException(`Data "id_bolt_count" or "bolt_count" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelBoltCount(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelBoltCounts = yield this.wheelBoltCountRepository.destroy({ where: { id_bolt_count: getPropertyDto.id_bolt_count } });
                return removeWheelBoltCounts;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelBoltCountService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelBoltCount)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelBoltCountService);
export { PropsWheelBoltCountService };
