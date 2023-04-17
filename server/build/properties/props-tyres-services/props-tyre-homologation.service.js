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
import { TyreHomologation } from '../entities/tyres/tyre-homologation.model';
let PropsTyreHomologationService = class PropsTyreHomologationService {
    constructor(tyreHomologationRepository, tyresService) {
        this.tyreHomologationRepository = tyreHomologationRepository;
        this.tyresService = tyresService;
    }
    createTyreHomologation(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreHomologation = yield this.tyreHomologationRepository.findOne({ where: { homologation: createPropertyDto.homologation } });
                if (tyreId && tyreHomologation) {
                    const updateHomologation = yield this.tyreHomologationRepository.update({
                        homologation: createPropertyDto.homologation
                    }, { where: { id_homologation: tyreHomologation.id_homologation } });
                    yield tyreId.$set('homologation', updateHomologation);
                    return updateHomologation;
                }
                else if (tyreId && !tyreHomologation) {
                    const newTyreHomologation = yield this.tyreHomologationRepository.create(createPropertyDto);
                    yield tyreId.$set('homologation', newTyreHomologation);
                    return newTyreHomologation;
                }
                else {
                    const tyreHomologation = yield this.tyreHomologationRepository.create(createPropertyDto);
                    return tyreHomologation;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreHomologationFromPrice(id, homologation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreHomologation, created] = yield this.tyreHomologationRepository.findOrCreate({ where: { homologation: homologation },
                    defaults: { homologation: homologation } });
                if (created || !created) {
                    yield tyreHomologation.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreHomologation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllHomologation = yield this.tyreHomologationRepository.findAll({ include: { all: true } });
                return tyreAllHomologation;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreHomologationById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const homologationId = yield this.tyreHomologationRepository.findByPk(getPropertyDto.id_homologation, { include: { all: true } });
                return homologationId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreHomologation(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const homologationTyresId = yield this.tyreHomologationRepository.findByPk(updatePropertyDto.id_homologation, { include: { all: true } });
                if (homologationTyresId) {
                    const updateHomologation = yield this.tyreHomologationRepository.update({ homologation: updatePropertyDto.homologation }, { where: { id_homologation: updatePropertyDto.id_homologation } });
                    return updateHomologation;
                }
                return new HttpException(`Data "id_height" or "height" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreHomologation(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreHomologations = yield this.tyreHomologationRepository.destroy({ where: { id_homologation: getPropertyDto.id_homologation } });
                return removeTyreHomologations;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreHomologationService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreHomologation)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreHomologationService);
export { PropsTyreHomologationService };
