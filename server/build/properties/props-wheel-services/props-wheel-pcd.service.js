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
import { WheelPcd } from '../entities/wheels/wheel-pcd.model';
let PropsWheelPcdService = class PropsWheelPcdService {
    constructor(wheelPcdRepository, wheelsService) {
        this.wheelPcdRepository = wheelPcdRepository;
        this.wheelsService = wheelsService;
    }
    createWheelPcd(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelPcd = yield this.wheelPcdRepository.findOne({ where: { pcd: createPropertyDto.pcd } });
                if (wheelId && wheelPcd) {
                    const updatePcd = yield this.wheelPcdRepository.update({
                        pcd: createPropertyDto.pcd
                    }, { where: { id_pcd: wheelPcd.id_pcd } });
                    yield wheelId.$set('pcd', updatePcd);
                    return updatePcd;
                }
                else if (wheelId && !wheelPcd) {
                    const newWheelPcd = yield this.wheelPcdRepository.create(createPropertyDto);
                    yield wheelId.$set('pcd', newWheelPcd);
                    return newWheelPcd;
                }
                else {
                    const wheelPcd = yield this.wheelPcdRepository.create(createPropertyDto);
                    return wheelPcd;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelPcdFromPrice(id, pcd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelPcd, created] = yield this.wheelPcdRepository.findOrCreate({ where: { pcd: pcd }, defaults: { pcd: pcd } });
                if (created || !created) {
                    yield wheelPcd.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelPcd() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllPcd = yield this.wheelPcdRepository.findAll({ include: { all: true } });
                return wheelAllPcd;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelPcdById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pcdId = yield this.wheelPcdRepository.findByPk(getPropertyDto.id_pcd, { include: { all: true } });
                return pcdId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelPcd(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pcdWheelId = yield this.wheelPcdRepository.findByPk(updatePropertyDto.id_pcd, { include: { all: true } });
                if (pcdWheelId) {
                    const updatePcd = yield this.wheelPcdRepository.update({ pcd: updatePropertyDto.pcd }, { where: { id_pcd: updatePropertyDto.id_pcd } });
                    return updatePcd;
                }
                return new HttpException(`Data "id_color" or "color" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelPcd(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelPcds = yield this.wheelPcdRepository.destroy({ where: { id_pcd: getPropertyDto.id_pcd } });
                return removeWheelPcds;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelPcdService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelPcd)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelPcdService);
export { PropsWheelPcdService };
