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
import { WheelType } from '../entities/wheels/wheel-type.model';
let PropsWheelTypeService = class PropsWheelTypeService {
    constructor(wheelTypeRepository, wheelsService) {
        this.wheelTypeRepository = wheelTypeRepository;
        this.wheelsService = wheelsService;
    }
    createWheelType(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelId = yield this.wheelsService.findWheelById(createPropertyDto);
                const wheelType = yield this.wheelTypeRepository.findOne({ where: { type: createPropertyDto.type } });
                if (wheelId && wheelType) {
                    const updateType = yield this.wheelTypeRepository.update({
                        type: createPropertyDto.type
                    }, { where: { id_type: wheelType.id_type } });
                    yield wheelId.$set('type', updateType);
                    return updateType;
                }
                else if (wheelId && !wheelType) {
                    const newWheelType = yield this.wheelTypeRepository.create(createPropertyDto);
                    yield wheelId.$set('type', newWheelType);
                    return newWheelType;
                }
                else {
                    const wheelType = yield this.wheelTypeRepository.create(createPropertyDto);
                    return wheelType;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelTypeFromPrice(id, id_type, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelType, created] = yield this.wheelTypeRepository.findOrCreate({ where: { id_type: id_type }, defaults: { id_type: id_type, type: type } });
                if (created || !created) {
                    yield wheelType.$add('wheels', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheelType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelAllType = yield this.wheelTypeRepository.findAll({ include: { all: true } });
                return wheelAllType;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelTypeById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const typeId = yield this.wheelTypeRepository.findByPk(getPropertyDto.id_type, { include: { all: true } });
                return typeId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateWheelType(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const typeWheelId = yield this.wheelTypeRepository.findByPk(updatePropertyDto.id_type, { include: { all: true } });
                if (typeWheelId) {
                    const updateType = yield this.wheelTypeRepository.update({ type: updatePropertyDto.type }, { where: { id_type: updatePropertyDto.id_type } });
                    return updateType;
                }
                return new HttpException(`Data "id_type" or "type" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeWheelType(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeWheelTypes = yield this.wheelTypeRepository.destroy({ where: { id_type: getPropertyDto.id_type } });
                return removeWheelTypes;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsWheelTypeService = __decorate([
    Injectable(),
    __param(0, InjectModel(WheelType)),
    __metadata("design:paramtypes", [Object, WheelsService])
], PropsWheelTypeService);
export { PropsWheelTypeService };
