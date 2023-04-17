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
import { WheelEt } from '../entities/wheels/wheel-et.model';
let PropsWheelEtService = class PropsWheelEtService {
    constructor(wheelEtRepository, wheelsService) {
        this.wheelEtRepository = wheelEtRepository;
        this.wheelsService = wheelsService;
    }
    createWheelEt(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelEt = yield this.wheelEtRepository.findOne({ where: { et: createPropertyDto.et } });
                if (wheelId && wheelEt) {
                    const updateEt = yield this.wheelEtRepository.update({
                        et: createPropertyDto.et
                    }, { where: { id_et: wheelEt.id_et } });
                    yield wheelId.$set('et', updateEt);
                    return updateEt;
                }
                else if (wheelId && !wheelEt) {
                    const newWheelEt = yield this.wheelEtRepository.create(createPropertyDto);
                    yield wheelId.$set('et', newWheelEt);
                    return newWheelEt;
                }
                else {
                    const wheelEt = yield this.wheelEtRepository.create(createPropertyDto);
                    return wheelEt;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelEtFromPrice(id, et) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelEt, created] = yield this.wheelEtRepository.findOrCreate({ where: { et: et }, defaults: { et: et } });
                if (created || !created) {
                    yield wheelEt.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelEt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllEt = yield this.wheelEtRepository.findAll({ include: { all: true } });
                return wheelAllEt;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelEtById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const etId = yield this.wheelEtRepository.findByPk(getPropertyDto.id_et, { include: { all: true } });
                return etId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelEt(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const etWheelId = yield this.wheelEtRepository.findByPk(updatePropertyDto.id_et, { include: { all: true } });
                if (etWheelId) {
                    const updateEt = yield this.wheelEtRepository.update({ et: updatePropertyDto.et }, { where: { id_et: updatePropertyDto.id_et } });
                    return updateEt;
                }
                return new HttpException(`Data "id_et" or "et" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelEt(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelEts = yield this.wheelEtRepository.destroy({ where: { id_et: getPropertyDto.id_et } });
                return removeWheelEts;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelEtService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelEt)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelEtService);
export { PropsWheelEtService };
