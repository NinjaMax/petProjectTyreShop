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
import { WheelPcd2 } from '../entities/wheels/wheel-pcd2.model';
let PropsWheelPcd2Service = class PropsWheelPcd2Service {
    constructor(wheelPcd2Repository, wheelsService) {
        this.wheelPcd2Repository = wheelPcd2Repository;
        this.wheelsService = wheelsService;
    }
    createWheelPcd2(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelPcd2 = yield this.wheelPcd2Repository.findOne({ where: { pcd2: createPropertyDto.pcd2 } });
                if (wheelId && wheelPcd2) {
                    const updatePcd2 = yield this.wheelPcd2Repository.update({
                        pcd2: createPropertyDto.pcd2
                    }, { where: { id_pcd2: wheelPcd2.id_pcd2 } });
                    yield wheelId.$set('pcd2', updatePcd2);
                    return updatePcd2;
                }
                else if (wheelId && !wheelPcd2) {
                    const newWheelPcd2 = yield this.wheelPcd2Repository.create(createPropertyDto);
                    yield wheelId.$set('pcd2', newWheelPcd2);
                    return newWheelPcd2;
                }
                else {
                    const wheelPcd2 = yield this.wheelPcd2Repository.create(createPropertyDto);
                    return wheelPcd2;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelPcd2FromPrice(id, pcd2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelPcd2, created] = yield this.wheelPcd2Repository.findOrCreate({ where: { pcd2: pcd2 }, defaults: { pcd2: pcd2 } });
                if (created || !created) {
                    yield wheelPcd2.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelPcd2() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllPcd2 = yield this.wheelPcd2Repository.findAll({ include: { all: true } });
                return wheelAllPcd2;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelPcd2ById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pcd2Id = yield this.wheelPcd2Repository.findByPk(getPropertyDto.id_pcd2, { include: { all: true } });
                return pcd2Id;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelPcd2(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pcd2WheelId = yield this.wheelPcd2Repository.findByPk(updatePropertyDto.id_pcd2, { include: { all: true } });
                if (pcd2WheelId) {
                    const updatePcd2 = yield this.wheelPcd2Repository.update({ pcd2: updatePropertyDto.pcd2 }, { where: { id_pcd2: updatePropertyDto.id_pcd2 } });
                    return updatePcd2;
                }
                return new HttpException(`Data "id_pcd2" or "pcd2" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelPcd2(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelPcd2s = yield this.wheelPcd2Repository.destroy({ where: { id_pcd2: getPropertyDto.id_pcd2 } });
                return removeWheelPcd2s;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelPcd2Service = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelPcd2)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelPcd2Service);
export { PropsWheelPcd2Service };
