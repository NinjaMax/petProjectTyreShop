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
import { TyreSilent } from '../entities/tyres/tyre-silent.model';
let PropsTyreSilentService = class PropsTyreSilentService {
    constructor(tyreSilentRepository, tyresService) {
        this.tyreSilentRepository = tyreSilentRepository;
        this.tyresService = tyresService;
    }
    createTyreSilent(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreSilent = yield this.tyreSilentRepository.findOne({ where: { silent: createPropertyDto.silent } });
                if (tyreId && tyreSilent) {
                    const updateSilent = yield this.tyreSilentRepository.update({
                        silent: createPropertyDto.silent
                    }, { where: { id_silent: tyreSilent.id_silent } });
                    yield tyreId.$set('silent', updateSilent);
                    return updateSilent;
                }
                else if (tyreId && !tyreSilent) {
                    const newTyreSilent = yield this.tyreSilentRepository.create(createPropertyDto);
                    yield tyreId.$set('silent', newTyreSilent);
                    return newTyreSilent;
                }
                else {
                    const tyreSilent = yield this.tyreSilentRepository.create(createPropertyDto);
                    return tyreSilent;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreSilentFromPrice(id, silent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreSilent, created] = yield this.tyreSilentRepository.findOrCreate({ where: { silent: silent }, defaults: { silent: silent } });
                if (created || !created) {
                    yield tyreSilent.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreCountry() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllCountry = yield this.tyreSilentRepository.findAll({ include: { all: true } });
                return tyreAllCountry;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreCountryById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CountryId = yield this.tyreSilentRepository.findByPk(getPropertyDto.id_country, { include: { all: true } });
                return CountryId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreCountry(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const silentTyresId = yield this.tyreSilentRepository.findByPk(updatePropertyDto.id_silent, { include: { all: true } });
                if (silentTyresId) {
                    const updateSilent = yield this.tyreSilentRepository.update({ silent: updatePropertyDto.silent }, { where: { id_silent: updatePropertyDto.id_silent } });
                    return updateSilent;
                }
                return new HttpException(`Data "id_silent" or "silent" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreSilent(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreSilents = yield this.tyreSilentRepository.destroy({ where: { id_silent: getPropertyDto.id_silent } });
                return removeTyreSilents;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreSilentService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreSilent)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreSilentService);
export { PropsTyreSilentService };
