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
import { TyreLoadIndex } from '../entities/tyres/tyre-loadIndex.model';
let PropsTyreLoadIndexService = class PropsTyreLoadIndexService {
    constructor(tyreLoadIndexRepository, tyresService) {
        this.tyreLoadIndexRepository = tyreLoadIndexRepository;
        this.tyresService = tyresService;
    }
    createTyreLoadIndex(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreLoadIndex = yield this.tyreLoadIndexRepository.findOne({ where: { load_index: createPropertyDto.load_index } });
                if (tyreId && tyreLoadIndex) {
                    const updateLoadIndex = yield this.tyreLoadIndexRepository.update({
                        load_index: createPropertyDto.load_index,
                        load_index_with_desc: createPropertyDto.load_index_with_desc
                    }, { where: { id_load_index: tyreLoadIndex.id_load_index } });
                    yield tyreId.$set('load_index', updateLoadIndex);
                    return updateLoadIndex;
                }
                else if (tyreId && !tyreLoadIndex) {
                    const newTyreLoadIndex = yield this.tyreLoadIndexRepository.create(createPropertyDto);
                    yield tyreId.$set('load_index', newTyreLoadIndex);
                    return newTyreLoadIndex;
                }
                else {
                    const tyreLoadIndex = yield this.tyreLoadIndexRepository.create(createPropertyDto);
                    return tyreLoadIndex;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createLoadIndexFromPrice(id, load_index, load_index_with_desc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreLoadIndex, created] = yield this.tyreLoadIndexRepository.findOrCreate({ where: { load_index: load_index },
                    defaults: { load_index: load_index,
                        load_index_with_desc: load_index_with_desc
                    }
                });
                if (created || !created) {
                    yield tyreLoadIndex.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreLoadIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllLoadIndex = yield this.tyreLoadIndexRepository.findAll({ include: { all: true } });
                return tyreAllLoadIndex;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreLoadIndexById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loadIndexId = yield this.tyreLoadIndexRepository.findByPk(getPropertyDto.id_load_index, { include: { all: true } });
                return loadIndexId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreLoadIndex(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loadIndexTyresId = yield this.tyreLoadIndexRepository.findByPk(updatePropertyDto.id_load_index, { include: { all: true } });
                if (loadIndexTyresId) {
                    const updateLoadIndex = yield this.tyreLoadIndexRepository.update({ load_index: updatePropertyDto.load_index }, { where: { id_load_index: updatePropertyDto.id_load_index } });
                    return updateLoadIndex;
                }
                return new HttpException(`Data "id_load_index" or "load_index" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreLoadIndex(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreLoadIndexes = yield this.tyreLoadIndexRepository.destroy({ where: { id_load_index: getPropertyDto.id_load_index } });
                return removeTyreLoadIndexes;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreLoadIndexService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreLoadIndex)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreLoadIndexService);
export { PropsTyreLoadIndexService };
