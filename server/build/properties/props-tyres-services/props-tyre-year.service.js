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
import { TyreYear } from '../entities/tyres/tyre-year.model';
let PropsTyreYearService = class PropsTyreYearService {
    constructor(tyreYearRepository, tyresService) {
        this.tyreYearRepository = tyreYearRepository;
        this.tyresService = tyresService;
    }
    createTyreYear(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreYear = yield this.tyreYearRepository.findOne({ where: { manufacture_year: createPropertyDto.manufacture_year } });
                if (tyreId && tyreYear) {
                    const updateYear = yield this.tyreYearRepository.update({
                        manufacture_year: createPropertyDto.manufacture_year
                    }, { where: { id_year: tyreYear.id_year } });
                    yield tyreId.$set('year', updateYear);
                    return updateYear;
                }
                else if (tyreId && !tyreYear) {
                    const newTyreYear = yield this.tyreYearRepository.create(createPropertyDto);
                    yield tyreId.$set('year', newTyreYear);
                    return newTyreYear;
                }
                else {
                    const tyreYear = yield this.tyreYearRepository.create(createPropertyDto);
                    return tyreYear;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreYearFromPrice(id, manufacture_year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreYear, created] = yield this.tyreYearRepository.findOrCreate({ where: { manufacture_year: manufacture_year },
                    defaults: { manufacture_year: manufacture_year }
                });
                if (created || !created) {
                    yield tyreYear.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreYear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllYear = yield this.tyreYearRepository.findAll({ include: { all: true } });
                return tyreAllYear;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreYearById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const yearId = yield this.tyreYearRepository.findByPk(getPropertyDto.id_year, { include: { all: true } });
                return yearId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreYear(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const yearTyresId = yield this.tyreYearRepository.findByPk(updatePropertyDto.id_year, { include: { all: true } });
                if (yearTyresId) {
                    const updateYear = yield this.tyreYearRepository.update({ manufacture_year: updatePropertyDto.manufacture_year }, { where: { id_year: updatePropertyDto.id_year } });
                    return updateYear;
                }
                return new HttpException(`Data "id_year" or "year" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreYear(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreYears = yield this.tyreYearRepository.destroy({ where: { id_year: getPropertyDto.id_year } });
                return removeTyreYears;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreYearService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreYear)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreYearService);
export { PropsTyreYearService };
