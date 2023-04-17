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
import { TyreSpeedIndex } from '../entities/tyres/tyre-speedIndex.model';
let PropsTyreSpeedIndexService = class PropsTyreSpeedIndexService {
    constructor(tyreSpeedIndexRepository, tyresService) {
        this.tyreSpeedIndexRepository = tyreSpeedIndexRepository;
        this.tyresService = tyresService;
    }
    createTyreSpeedIndex(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreSpeedIndex = yield this.tyreSpeedIndexRepository.findOne({ where: { speed_index: createPropertyDto.speed_index } });
                if (tyreId && tyreSpeedIndex) {
                    const updateSpeedIndex = yield this.tyreSpeedIndexRepository.update({
                        speed_index: createPropertyDto.speed_index,
                        speed_index_with_desc: createPropertyDto.speed_index_with_desc
                    }, { where: { id_speed_index: tyreSpeedIndex.id_speed_index } });
                    yield tyreId.$set('speed_index', updateSpeedIndex);
                    return updateSpeedIndex;
                }
                else if (tyreId && !tyreSpeedIndex) {
                    const newTyreSpeedIndex = yield this.tyreSpeedIndexRepository.create(createPropertyDto);
                    yield tyreId.$set('speed_index', newTyreSpeedIndex);
                    return newTyreSpeedIndex;
                }
                else {
                    const tyreSpeedIndex = yield this.tyreSpeedIndexRepository.create(createPropertyDto);
                    return tyreSpeedIndex;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreSpeedIndexFromPrice(id, speed_index, speed_index_with_desc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreSpeedIndex, created] = yield this.tyreSpeedIndexRepository.findOrCreate({ where: { speed_index: speed_index },
                    defaults: {
                        speed_index: speed_index,
                        speed_index_with_desc: speed_index_with_desc
                    }
                });
                if (created || !created) {
                    yield tyreSpeedIndex.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreSpeedIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllSpeedIndex = yield this.tyreSpeedIndexRepository.findAll({ include: { all: true } });
                return tyreAllSpeedIndex;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreSpeedIndexById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speedIndexId = yield this.tyreSpeedIndexRepository.findByPk(getPropertyDto.id_speed_index, { include: { all: true } });
                return speedIndexId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreSpeedIndex(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speedIndexTyresId = yield this.tyreSpeedIndexRepository.findByPk(updatePropertyDto.id_speed_index, { include: { all: true } });
                if (speedIndexTyresId) {
                    const updateSpeedIndex = yield this.tyreSpeedIndexRepository.update({ speed_index: updatePropertyDto.speed_index,
                        speed_index_with_desc: updatePropertyDto.speed_index_with_desc
                    }, { where: { id_speed_index: updatePropertyDto.id_speed_index } });
                    return updateSpeedIndex;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreSpeedIndex(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreSpeedIndexes = yield this.tyreSpeedIndexRepository.destroy({ where: { id_speed_index: getPropertyDto.id_speed_index } });
                return removeTyreSpeedIndexes;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreSpeedIndexService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreSpeedIndex)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreSpeedIndexService);
export { PropsTyreSpeedIndexService };
