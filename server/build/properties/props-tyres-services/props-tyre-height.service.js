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
import { TyreHeight } from '../entities/tyres/tyre-height.model';
let PropsTyreHeightService = class PropsTyreHeightService {
    constructor(tyreHeightRepository, tyresService) {
        this.tyreHeightRepository = tyreHeightRepository;
        this.tyresService = tyresService;
    }
    createTyreHeight(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreHeight = yield this.tyreHeightRepository.findOne({ where: { height: createPropertyDto.height } });
                if (tyreId && tyreHeight) {
                    const updateHeight = yield this.tyreHeightRepository.update({
                        height: createPropertyDto.height
                    }, { where: { id_height: tyreHeight.id_height } });
                    yield tyreId.$set('height', updateHeight);
                    return updateHeight;
                }
                else if (tyreId && !tyreHeight) {
                    const newTyreHeight = yield this.tyreHeightRepository.create(createPropertyDto);
                    yield tyreId.$set('height', newTyreHeight);
                    return newTyreHeight;
                }
                else {
                    const tyreHeight = yield this.tyreHeightRepository.create(createPropertyDto);
                    return tyreHeight;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreHeightFromPrice(id, height) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreHeight, created] = yield this.tyreHeightRepository.findOrCreate({ where: { height: height }, defaults: { height: height } });
                if (created || !created) {
                    yield tyreHeight.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllHeight = yield this.tyreHeightRepository.findAll({ include: { all: true } });
                return tyreAllHeight;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreHeightById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandId = yield this.tyreHeightRepository.findByPk(getPropertyDto.id_height, { include: { all: true } });
                return brandId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreHeight(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const heightTyresId = yield this.tyreHeightRepository.findByPk(updatePropertyDto.id_height, { include: { all: true } });
                if (heightTyresId) {
                    const updateHeight = yield this.tyreHeightRepository.update({ height: updatePropertyDto.height }, { where: { id_height: updatePropertyDto.id_height } });
                    return updateHeight;
                }
                return new HttpException(`Data "id_height" or "height" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreHeight(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreHeights = yield this.tyreHeightRepository.destroy({ where: { id_height: getPropertyDto.id_height } });
                return removeTyreHeights;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreHeightService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreHeight)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreHeightService);
export { PropsTyreHeightService };
