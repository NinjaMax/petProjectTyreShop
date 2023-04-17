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
import { TyreReinforce } from '../entities/tyres/tyre-reinforce.model';
let PropsTyreReinforceService = class PropsTyreReinforceService {
    constructor(tyreReinforceRepository, tyresService) {
        this.tyreReinforceRepository = tyreReinforceRepository;
        this.tyresService = tyresService;
    }
    createTyreReinforce(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreReinforce = yield this.tyreReinforceRepository.findOne({ where: { reinforce: createPropertyDto.reinforce } });
                if (tyreId && tyreReinforce) {
                    const updateReinforce = yield this.tyreReinforceRepository.update({
                        reinforce: createPropertyDto.reinforce
                    }, { where: { id_reinforce: tyreReinforce.id_reinforce } });
                    yield tyreId.$set('reinforce', updateReinforce);
                    return updateReinforce;
                }
                else if (tyreId && !tyreReinforce) {
                    const newTyreReinforce = yield this.tyreReinforceRepository.create(createPropertyDto);
                    yield tyreId.$set('reinforce', newTyreReinforce);
                    return newTyreReinforce;
                }
                else {
                    const tyreReinforce = yield this.tyreReinforceRepository.create(createPropertyDto);
                    return tyreReinforce;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreReinforceFromPrice(id, reinforce) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreReinforce, created] = yield this.tyreReinforceRepository.findOrCreate({ where: { reinforce: reinforce }, defaults: { reinforce: reinforce } });
                if (created || !created) {
                    yield tyreReinforce.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreReinforce() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllReinforce = yield this.tyreReinforceRepository.findAll({ include: { all: true } });
                return tyreAllReinforce;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreReinforceById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reinforceId = yield this.tyreReinforceRepository.findByPk(getPropertyDto.id_reinforce, { include: { all: true } });
                return reinforceId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreReinforce(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reinforceTyresId = yield this.tyreReinforceRepository.findByPk(updatePropertyDto.id_reinforce, { include: { all: true } });
                if (reinforceTyresId) {
                    const updateReinforce = yield this.tyreReinforceRepository.update({ reinforce: updatePropertyDto.reinforce }, { where: { id_reinforce: updatePropertyDto.id_reinforce } });
                    return updateReinforce;
                }
                return new HttpException(`Data "id_reinforce" or "reinforce" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreReinforce(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreReinforces = yield this.tyreReinforceRepository.destroy({ where: { id_reinforce: getPropertyDto.id_reinforce } });
                return removeTyreReinforces;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreReinforceService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreReinforce)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreReinforceService);
export { PropsTyreReinforceService };
