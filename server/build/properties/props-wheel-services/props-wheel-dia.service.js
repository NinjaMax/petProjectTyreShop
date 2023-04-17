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
import { WheelDia } from '../entities/wheels/wheel-dia.model';
let PropsWheelDiaService = class PropsWheelDiaService {
    constructor(wheelDiaRepository, wheelsService) {
        this.wheelDiaRepository = wheelDiaRepository;
        this.wheelsService = wheelsService;
    }
    createWheelBoltCount(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelDia = yield this.wheelDiaRepository.findOne({ where: { dia: createPropertyDto.dia } });
                if (wheelId && wheelDia) {
                    const updateDia = yield this.wheelDiaRepository.update({
                        dia: createPropertyDto.dia
                    }, { where: { id_dia: wheelDia.id_dia } });
                    yield wheelId.$set('dia', updateDia);
                    return updateDia;
                }
                else if (wheelId && !wheelDia) {
                    const newWheelDia = yield this.wheelDiaRepository.create(createPropertyDto);
                    yield wheelId.$set('dia', newWheelDia);
                    return newWheelDia;
                }
                else {
                    const wheelDia = yield this.wheelDiaRepository.create(createPropertyDto);
                    return wheelDia;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelDiaFromPrice(id, dia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelDia, created] = yield this.wheelDiaRepository.findOrCreate({ where: { dia: dia }, defaults: { dia: dia } });
                if (created || !created) {
                    yield wheelDia.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelDia() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllDia = yield this.wheelDiaRepository.findAll({ include: { all: true } });
                return wheelAllDia;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelDiaById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diaId = yield this.wheelDiaRepository.findByPk(getPropertyDto.id_dia, { include: { all: true } });
                return diaId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelDia(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diaWheelId = yield this.wheelDiaRepository.findByPk(updatePropertyDto.id_dia, { include: { all: true } });
                if (diaWheelId) {
                    const updateDia = yield this.wheelDiaRepository.update({ dia: updatePropertyDto.dia }, { where: { id_dia: updatePropertyDto.id_dia } });
                    return updateDia;
                }
                return new HttpException(`Data "id_dia" or "dia" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelDia(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelDias = yield this.wheelDiaRepository.destroy({ where: { id_dia: getPropertyDto.id_dia } });
                return removeWheelDias;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelDiaService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelDia)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelDiaService);
export { PropsWheelDiaService };
