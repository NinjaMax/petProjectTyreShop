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
import { WheelsService } from '../../wheels/wheels.service';
import { WheelModel } from '../entities/wheels/wheel-model.model';
let PropsWheelModelService = class PropsWheelModelService {
    constructor(wheelModelRepository, wheelsService) {
        this.wheelModelRepository = wheelModelRepository;
        this.wheelsService = wheelsService;
    }
    createWheelModel(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelModel = yield this.wheelModelRepository.findOne({ where: { model: createPropertyDto.model } });
                if (wheelId && wheelModel) {
                    const updateModel = yield this.wheelModelRepository.update({
                        model: createPropertyDto.model
                    }, { where: { id_model: wheelModel.id_model } });
                    yield wheelId.$set('model', updateModel);
                    return updateModel;
                }
                else if (wheelId && !wheelModel) {
                    const newWheelModel = yield this.wheelModelRepository.create(createPropertyDto);
                    yield wheelId.$set('model', newWheelModel);
                    return newWheelModel;
                }
                else {
                    const wheelModel = yield this.wheelModelRepository.create(createPropertyDto);
                    return wheelModel;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelModelFromPrice(id, id_model, model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelModel, created] = yield this.wheelModelRepository.findOrCreate({ where: { id_model: id_model },
                    defaults: { id_model: id_model, model: model }
                });
                if (created || !created) {
                    yield wheelModel.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllModel = yield this.wheelModelRepository.findAll({ include: { all: true } });
                return wheelAllModel;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelModelById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = yield this.wheelModelRepository.findByPk(getPropertyDto.id_model, { include: { all: true } });
                return modelId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelModel(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelWheelId = yield this.wheelModelRepository.findByPk(updatePropertyDto.id_model, { include: { all: true } });
                if (modelWheelId) {
                    const updateModel = yield this.wheelModelRepository.update({ model: updatePropertyDto.model }, { where: { id_model: updatePropertyDto.id_model } });
                    return updateModel;
                }
                return new HttpException(`Data "id_model" or "model" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelModel(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelModels = yield this.wheelModelRepository.destroy({ where: { id_model: getPropertyDto.id_model } });
                return removeWheelModels;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelModelService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelModel)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelModelService);
export { PropsWheelModelService };
