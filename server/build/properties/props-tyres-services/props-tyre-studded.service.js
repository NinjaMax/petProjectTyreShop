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
import { TyreStudded } from '../entities/tyres/tyre-studded.model';
let PropsTyreStuddedService = class PropsTyreStuddedService {
    constructor(tyreStuddedRepository, tyresService) {
        this.tyreStuddedRepository = tyreStuddedRepository;
        this.tyresService = tyresService;
    }
    createTyreStudded(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreStudded = yield this.tyreStuddedRepository.findOne({ where: { studded: createPropertyDto.studded } });
                if (tyreId && tyreStudded) {
                    const updateStudded = yield this.tyreStuddedRepository.update({
                        studded: createPropertyDto.studded
                    }, { where: { id_studded: tyreStudded.id_studded } });
                    yield tyreId.$set('studded', updateStudded);
                    return updateStudded;
                }
                else {
                    const newTyreStudded = yield this.tyreStuddedRepository.create(createPropertyDto);
                    yield tyreId.$set('studded', newTyreStudded.id_studded);
                    return newTyreStudded;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreStuddedFromPrice(id, studded) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreStudded, created] = yield this.tyreStuddedRepository.findOrCreate({ where: { studded: studded }, defaults: { studded: studded } });
                if (created || !created) {
                    yield tyreStudded.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreStudded() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllStudded = yield this.tyreStuddedRepository.findAll({ include: { all: true } });
                return tyreAllStudded;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreStuddedById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studdedId = yield this.tyreStuddedRepository.findByPk(getPropertyDto.id_studded, { include: { all: true } });
                return studdedId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreStudded(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studdedTyresId = yield this.tyreStuddedRepository.findByPk(updatePropertyDto.id_studded, { include: { all: true } });
                if (studdedTyresId) {
                    const updateStudded = yield this.tyreStuddedRepository.update({ studded: updatePropertyDto.studded }, { where: { id_studded: updatePropertyDto.id_studded } });
                    return updateStudded;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreStudded(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreStuddeds = yield this.tyreStuddedRepository.destroy({ where: { id_studded: getPropertyDto.id_studded } });
                return removeTyreStuddeds;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreStuddedService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreStudded)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreStuddedService);
export { PropsTyreStuddedService };
