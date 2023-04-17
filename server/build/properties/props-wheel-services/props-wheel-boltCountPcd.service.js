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
import { WheelBoltCountPcd } from '../entities/wheels/wheel-boltCountPcd.model';
let PropsWheelBoltCountPcdService = class PropsWheelBoltCountPcdService {
    constructor(wheelBoltCountPcdRepository, wheelsService) {
        this.wheelBoltCountPcdRepository = wheelBoltCountPcdRepository;
        this.wheelsService = wheelsService;
    }
    createWheelBoltCountPcd(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelBoltCountPcd = yield this.wheelBoltCountPcdRepository.findOne({ where: { bolt_count_pcd: createPropertyDto.bolt_count_pcd } });
                if (wheelId && wheelBoltCountPcd) {
                    const updateBoltCountPcd = yield this.wheelBoltCountPcdRepository.update({
                        bolt_count_pcd: createPropertyDto.bolt_count_pcd
                    }, { where: { id_bolt_count_pcd: wheelBoltCountPcd.id_bolt_count_pcd } });
                    yield wheelId.$set('bolt_count_pcd', updateBoltCountPcd);
                    return updateBoltCountPcd;
                }
                else if (wheelId && !wheelBoltCountPcd) {
                    const newWheelBoltCountPcd = yield this.wheelBoltCountPcdRepository.create(createPropertyDto);
                    yield wheelId.$set('bolt_count_pcd', newWheelBoltCountPcd);
                    return newWheelBoltCountPcd;
                }
                else {
                    const wheelBoltCountPcd = yield this.wheelBoltCountPcdRepository.create(createPropertyDto);
                    return wheelBoltCountPcd;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelBoltCountPcdFromPrice(id, bolt_count_pcd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelBoltCountPcd, created] = yield this.wheelBoltCountPcdRepository.findOrCreate({ where: { bolt_count_pcd: bolt_count_pcd },
                    defaults: { bolt_count_pcd: bolt_count_pcd }
                });
                if (created || !created) {
                    yield wheelBoltCountPcd.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelBoltCountPcd() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllBoltCountPcd = yield this.wheelBoltCountPcdRepository.findAll({ include: { all: true } });
                return wheelAllBoltCountPcd;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelBoltCountPcdById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boltCountPcdId = yield this.wheelBoltCountPcdRepository.findByPk(getPropertyDto.id_bolt_count_pcd, { include: { all: true } });
                return boltCountPcdId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelBoltCountPcd(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boltCountPcdWheelId = yield this.wheelBoltCountPcdRepository.findByPk(updatePropertyDto.id_bolt_count_pcd, { include: { all: true } });
                if (boltCountPcdWheelId) {
                    const updateBoltCountPcd = yield this.wheelBoltCountPcdRepository.update({ bolt_count_pcd: updatePropertyDto.bolt_count_pcd }, { where: { id_bolt_count_pcd: updatePropertyDto.id_bolt_count_pcd } });
                    return updateBoltCountPcd;
                }
                return new HttpException(`Data "id_bolt_count" or "bolt_count" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelBoltCountPcd(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelBoltCountPcds = yield this.wheelBoltCountPcdRepository.destroy({ where: { id_bolt_count_pcd: getPropertyDto.id_bolt_count_pcd } });
                return removeWheelBoltCountPcds;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelBoltCountPcdService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelBoltCountPcd)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelBoltCountPcdService);
export { PropsWheelBoltCountPcdService };
