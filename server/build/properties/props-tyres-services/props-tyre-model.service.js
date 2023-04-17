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
import { TyreModel } from '../entities/tyres/tyre-model.model';
import { TyresService } from '../../tyres/tyres.service';
let PropsModelService = class PropsModelService {
    constructor(tyreModelRepository, tyresService) {
        this.tyreModelRepository = tyreModelRepository;
        this.tyresService = tyresService;
    }
    createTyreModel(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                if (tyreId) {
                    const tyreModel = yield this.tyreModelRepository.create(createPropertyDto);
                    const createTyreModel = yield this.tyreModelRepository.findByPk(tyreModel.id_model, { include: { all: true } });
                    yield createTyreModel.$add('tyres', [createPropertyDto.id]);
                    createTyreModel.tyres.push(tyreId);
                    createTyreModel.reload();
                    return createTyreModel;
                }
                else {
                    const newTyreModel = yield this.tyreModelRepository.create(createPropertyDto);
                    return newTyreModel;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreModelFromPrice(id, id_model, model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreModel, created] = yield this.tyreModelRepository.findOrCreate({ where: { id_model: id_model },
                    defaults: { id_model: id_model, model: model } });
                if (created || !created) {
                    yield tyreModel.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllModel = yield this.tyreModelRepository.findAll({ include: { all: true } });
                return tyreAllModel;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findModelById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = yield this.tyreModelRepository.findByPk(getPropertyDto.id_model, { include: { all: true } });
                return modelId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreModel(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelTyresId = yield this.tyreModelRepository.findByPk(updatePropertyDto.id_model, { include: { all: true } });
                const tyresId = yield this.tyresService.findTyresById(updatePropertyDto);
                if (modelTyresId) {
                    yield this.tyreModelRepository.update({ model: updatePropertyDto.model,
                        id_model: updatePropertyDto.id_model,
                        tyres: modelTyresId.tyres
                    }, { where: { id_model: updatePropertyDto.id_model } });
                    const updateBrand = modelTyresId.tyres.find(item => item.id == updatePropertyDto.id);
                    if (!updateBrand) {
                        yield modelTyresId.$add('tyres', [updatePropertyDto.id]);
                        modelTyresId.tyres.push(tyresId);
                    }
                    const updateTyreModel = yield this.tyreModelRepository.findByPk(updatePropertyDto.id_model, { include: { all: true } });
                    return updateTyreModel;
                }
                return new HttpException(`Data "id_model" or "model" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreModel(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreModels = yield this.tyreModelRepository.destroy({ where: { id: getPropertyDto.id } });
                return removeTyreModels;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsModelService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreModel)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsModelService);
export { PropsModelService };
