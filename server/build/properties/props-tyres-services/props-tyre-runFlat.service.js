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
import { TyreRunFlat } from '../entities/tyres/tyre-runFlat.model';
let PropsTyreRunFlatService = class PropsTyreRunFlatService {
    constructor(tyreRunFlatRepository, tyresService) {
        this.tyreRunFlatRepository = tyreRunFlatRepository;
        this.tyresService = tyresService;
    }
    createTyreRunFlat(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreRunFlat = yield this.tyreRunFlatRepository.findOne({ where: { run_flat: createPropertyDto.run_flat } });
                if (tyreId && tyreRunFlat) {
                    const updateRunFlat = yield this.tyreRunFlatRepository.update({
                        run_flat: createPropertyDto.run_flat
                    }, { where: { id_run_flat: tyreRunFlat.id_run_flat } });
                    yield tyreId.$set('run_flat', updateRunFlat);
                    return updateRunFlat;
                }
                else if (tyreId && !tyreRunFlat) {
                    const newTyreRunFlat = yield this.tyreRunFlatRepository.create(createPropertyDto);
                    yield tyreId.$set('country', newTyreRunFlat);
                    return newTyreRunFlat;
                }
                else {
                    const tyreRunFlat = yield this.tyreRunFlatRepository.create(createPropertyDto);
                    return tyreRunFlat;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreRunFlatFromPrice(id, run_flat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreRunFlat, created] = yield this.tyreRunFlatRepository.findOrCreate({ where: { run_flat: run_flat }, defaults: { run_flat: run_flat } });
                if (created || !created) {
                    yield tyreRunFlat.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreRunFlat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllRunFlat = yield this.tyreRunFlatRepository.findAll({ include: { all: true } });
                return tyreAllRunFlat;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreRunFlatById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const runFlatId = yield this.tyreRunFlatRepository.findByPk(getPropertyDto.id_run_flat, { include: { all: true } });
                return runFlatId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreRunFlat(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const runFlatTyresId = yield this.tyreRunFlatRepository.findByPk(updatePropertyDto.id_run_flat, { include: { all: true } });
                if (runFlatTyresId) {
                    const updateRunFlat = yield this.tyreRunFlatRepository.update({ run_flat: updatePropertyDto.run_flat }, { where: { id_run_flat: updatePropertyDto.id_run_flat } });
                    return updateRunFlat;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreRunFlat(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreRunFlats = yield this.tyreRunFlatRepository.destroy({ where: { id_run_flat: getPropertyDto.id_run_flat } });
                return removeTyreRunFlats;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreRunFlatService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreRunFlat)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreRunFlatService);
export { PropsTyreRunFlatService };
