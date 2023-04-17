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
import { Tyres } from './entities/tyres.model';
let TyresService = class TyresService {
    constructor(tyresRepository) {
        this.tyresRepository = tyresRepository;
    }
    createTyres(createTyreDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyres = yield this.tyresRepository.create(createTyreDto);
                return tyres;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyresFromPrice(id, full_name, photo_url, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyresIdFromPrice, created] = yield this.tyresRepository.findOrCreate({ where: { id: id },
                    defaults: {
                        id: id,
                        full_name: full_name,
                        photo_url: photo_url,
                        update_date: update_date,
                    } });
                if (!created) {
                    yield tyresIdFromPrice.update({
                        update_date: update_date
                    }, { where: { id: tyresIdFromPrice.id } });
                    return tyresIdFromPrice;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyres() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresAll = yield this.tyresRepository.findAll({ include: { all: true } });
                return tyresAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyresById(getTyreDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresId = yield this.tyresRepository.findByPk(getTyreDto.id, { include: { all: true } });
                return tyresId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyresByIdPrice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresId = yield this.tyresRepository.findByPk(id, { include: { all: true } });
                return tyresId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyres(updateTyreDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyresId = yield this.tyresRepository.findByPk(updateTyreDto.id, { include: { all: true } });
                if (tyresId) {
                    yield this.tyresRepository.update({
                        full_name: updateTyreDto.full_name,
                        photo_url: updateTyreDto.photo_url,
                    }, { where: { id: updateTyreDto.id } });
                    tyresId.save();
                    return tyresId;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    remove(getTyreDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyres = yield this.tyresRepository.destroy({ where: { id: getTyreDto.id } });
                return removeTyres;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
TyresService = __decorate([
    Injectable(),
    __param(0, InjectModel(Tyres)),
    __metadata("design:paramtypes", [Object])
], TyresService);
export { TyresService };
