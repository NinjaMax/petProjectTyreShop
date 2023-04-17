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
import { TyreParams } from '../entities/tyres/tyre-params.model';
let PropsTyreParamsService = class PropsTyreParamsService {
    constructor(tyreParamsRepository, tyresService) {
        this.tyreParamsRepository = tyreParamsRepository;
        this.tyresService = tyresService;
    }
    createTyreParams(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreParams = yield this.tyreParamsRepository.findOne({ where: { params: createPropertyDto.params } });
                if (tyreId && tyreParams) {
                    const updateParams = yield this.tyreParamsRepository.update({
                        params: createPropertyDto.params
                    }, { where: { id_params: tyreParams.id_params } });
                    yield tyreId.$set('params', updateParams);
                    return updateParams;
                }
                else if (tyreId && !tyreParams) {
                    const newTyreParams = yield this.tyreParamsRepository.create(createPropertyDto);
                    yield tyreId.$set('params', newTyreParams);
                    return newTyreParams;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createParamsFromPrice(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreParams, created] = yield this.tyreParamsRepository.findOrCreate({ where: { params: params }, defaults: { params: params } });
                if (created || !created) {
                    yield tyreParams.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllLoadIndex = yield this.tyreParamsRepository.findAll({ include: { all: true } });
                return tyreAllLoadIndex;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreParamsById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramsId = yield this.tyreParamsRepository.findByPk(getPropertyDto.id_params, { include: { all: true } });
                return paramsId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreParams(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramsTyresId = yield this.tyreParamsRepository.findByPk(updatePropertyDto.id_params, { include: { all: true } });
                if (paramsTyresId) {
                    const updateParams = yield this.tyreParamsRepository.update({ params: updatePropertyDto.params }, { where: { id_params: updatePropertyDto.id_params } });
                    return updateParams;
                }
                return new HttpException(`Data "id_load_index" or "load_index" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreParams(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreParamse = yield this.tyreParamsRepository.destroy({ where: { id_params: getPropertyDto.id_params } });
                return removeTyreParamse;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreParamsService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreParams)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreParamsService);
export { PropsTyreParamsService };
