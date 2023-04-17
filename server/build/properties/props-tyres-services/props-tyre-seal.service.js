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
import { TyresService } from '../../tyres/tyres.service';
import { TyreSeal } from '../entities/tyres/tyre-seal.model';
let PropsTyreSealService = class PropsTyreSealService {
    constructor(tyreSealRepository, tyresService) {
        this.tyreSealRepository = tyreSealRepository;
        this.tyresService = tyresService;
    }
    createTyreSeal(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreSeal = yield this.tyreSealRepository.findOne({ where: { seal: createPropertyDto.seal } });
                if (tyreId && tyreSeal) {
                    const updateSeal = yield this.tyreSealRepository.update({
                        seal: createPropertyDto.seal
                    }, { where: { id_seal: tyreSeal.id_seal } });
                    yield tyreId.$set('seal', updateSeal);
                    return updateSeal;
                }
                else if (tyreId && !tyreSeal) {
                    const newTyreSeal = yield this.tyreSealRepository.create(createPropertyDto);
                    yield tyreId.$set('country', newTyreSeal);
                    return newTyreSeal;
                }
                else {
                    const tyreSeal = yield this.tyreSealRepository.create(createPropertyDto);
                    return tyreSeal;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreSealFromPrice(id, seal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreSeal, created] = yield this.tyreSealRepository.findOrCreate({ where: { seal: seal }, defaults: { seal: seal } });
                if (created || !created) {
                    yield tyreSeal.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreSeal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllSeal = yield this.tyreSealRepository.findAll({ include: { all: true } });
                return tyreAllSeal;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreSealById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sealId = yield this.tyreSealRepository.findByPk(getPropertyDto.id_seal, { include: { all: true } });
                return sealId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreSeal(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sealTyresId = yield this.tyreSealRepository.findByPk(updatePropertyDto.id_seal, { include: { all: true } });
                if (sealTyresId) {
                    const updateSeal = yield this.tyreSealRepository.update({ seal: updatePropertyDto.seal,
                    }, { where: { id_seal: updatePropertyDto.id_seal } });
                    return updateSeal;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreSeal(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreSeals = yield this.tyreSealRepository.destroy({ where: { id_seal: getPropertyDto.id_seal } });
                return removeTyreSeals;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreSealService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreSeal)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreSealService);
export { PropsTyreSealService };
