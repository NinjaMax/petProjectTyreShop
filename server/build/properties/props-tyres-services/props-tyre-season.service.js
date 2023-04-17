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
import { TyreSeason } from '../entities/tyres/tyre-season.model';
let PropsTyreSeasonService = class PropsTyreSeasonService {
    constructor(tyreSeasonRepository, tyresService) {
        this.tyreSeasonRepository = tyreSeasonRepository;
        this.tyresService = tyresService;
    }
    createTyreSeason(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreSeason = yield this.tyreSeasonRepository.findOne({ where: { season: createPropertyDto.season } });
                if (tyreId && tyreSeason) {
                    const updateSeason = yield this.tyreSeasonRepository.update({
                        season: createPropertyDto.season
                    }, { where: { id_season: tyreSeason.id_season } });
                    yield tyreId.$set('season', updateSeason);
                    return updateSeason;
                }
                else {
                    const newTyreSeason = yield this.tyreSeasonRepository.create(createPropertyDto);
                    yield tyreId.$set('season', newTyreSeason.id_season);
                    return newTyreSeason;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreSeasonFromPrice(id, id_season, season, season_ua) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreSeason, created] = yield this.tyreSeasonRepository.findOrCreate({ where: { season: season },
                    defaults: {
                        id_season: id_season,
                        season: season,
                        season_ua: season_ua
                    } });
                if (created || !created) {
                    yield tyreSeason.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreSeason() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllSeason = yield this.tyreSeasonRepository.findAll({ include: { all: true } });
                return tyreAllSeason;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreSeasonById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seasonId = yield this.tyreSeasonRepository.findByPk(getPropertyDto.id_season, { include: { all: true } });
                return seasonId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreSeason(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seasonTyresId = yield this.tyreSeasonRepository.findByPk(updatePropertyDto.id_season, { include: { all: true } });
                if (seasonTyresId) {
                    const updateSeason = yield this.tyreSeasonRepository.update({ season: updatePropertyDto.season }, { where: { id_season: updatePropertyDto.id_season } });
                    return updateSeason;
                }
                return new HttpException(`Data "id_season" or "season" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreCountry(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreSeason = yield this.tyreSeasonRepository.destroy({ where: { id_season: getPropertyDto.id_season } });
                return removeTyreSeason;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreSeasonService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreSeason)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreSeasonService);
export { PropsTyreSeasonService };
