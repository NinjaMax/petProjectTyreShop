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
import { Oil } from './entities/oil.model';
let OilsService = class OilsService {
    constructor(oilRepository) {
        this.oilRepository = oilRepository;
    }
    createOil(createOilDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oil = yield this.oilRepository.create(createOilDto);
                return oil;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllOils() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilAll = yield this.oilRepository.findAll({ include: { all: true } });
                return oilAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findOilById(getOilDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilById = yield this.oilRepository.findByPk(getOilDto.id, { include: { all: true } });
                return oilById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateOilDto) {
        return `This action updates a #${id} oil`;
    }
    removeOil(getOilDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oilRemove = yield this.oilRepository.destroy({ where: { id: getOilDto.id } });
                return oilRemove;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
OilsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Oil)),
    __metadata("design:paramtypes", [Object])
], OilsService);
export { OilsService };
