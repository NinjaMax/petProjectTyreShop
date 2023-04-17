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
import { TyreCountry } from '../entities/tyres/tyre-country.model';
let PropsTyreCountryService = class PropsTyreCountryService {
    constructor(tyreCountryRepository, tyresService) {
        this.tyreCountryRepository = tyreCountryRepository;
        this.tyresService = tyresService;
    }
    createTyreCountry(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreCountry = yield this.tyreCountryRepository.findOne({ where: { country_manufacturer: createPropertyDto.country_manufacturer } });
                if (tyreId && tyreCountry) {
                    const updateCountry = yield this.tyreCountryRepository.update({
                        country_manufacturer: createPropertyDto.country_manufacturer,
                        country_manufacturer_ua: createPropertyDto.country_manufacturer_ua
                    }, { where: { id_country: tyreCountry.id_country } });
                    yield tyreId.$set('country', updateCountry);
                    return updateCountry;
                }
                else if (tyreId && !tyreCountry) {
                    const newTyreCountry = yield this.tyreCountryRepository.create(createPropertyDto);
                    yield tyreId.$set('country', newTyreCountry);
                    return newTyreCountry;
                }
                else {
                    const tyreCountry = yield this.tyreCountryRepository.create(createPropertyDto);
                    return tyreCountry;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreCountryFromPrice(id, country_manufacturer, country_manufacturer_ua) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreCountry, created] = yield this.tyreCountryRepository.findOrCreate({ where: { country_manufacturer: country_manufacturer },
                    defaults: {
                        country_manufacturer: country_manufacturer,
                        country_manufacturer_ua: country_manufacturer_ua
                    } });
                if (created || !created) {
                    yield tyreCountry.$add('tyres', id);
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
                const tyreAllCountry = yield this.tyreCountryRepository.findAll({ include: { all: true } });
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
                const countryId = yield this.tyreCountryRepository.findByPk(getPropertyDto.id_country, { include: { all: true } });
                return countryId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreCountry(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countryTyresId = yield this.tyreCountryRepository.findByPk(updatePropertyDto.id_country, { include: { all: true } });
                if (countryTyresId) {
                    const updateCountry = yield this.tyreCountryRepository.update({ country_manufacturer: updatePropertyDto.country_manufacturer,
                        country_manufacturer_ua: updatePropertyDto.country_manufacturer_ua
                    }, { where: { id_country: updatePropertyDto.id_country } });
                    return updateCountry;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreCountry(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreCountrys = yield this.tyreCountryRepository.destroy({ where: { id_country: getPropertyDto.id_country } });
                return removeTyreCountrys;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreCountryService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreCountry)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreCountryService);
export { PropsTyreCountryService };
