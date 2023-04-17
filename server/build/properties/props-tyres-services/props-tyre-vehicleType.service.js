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
import { TyreVehicleType } from '../entities/tyres/tyre-vehicleType.model';
let PropsTyreVehicleTypeService = class PropsTyreVehicleTypeService {
    constructor(tyreVehicleTypeRepository, tyresService) {
        this.tyreVehicleTypeRepository = tyreVehicleTypeRepository;
        this.tyresService = tyresService;
    }
    createTyreVehicleType(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreVehicleType = yield this.tyreVehicleTypeRepository.findOne({ where: { vehicle_type: createPropertyDto.vehicle_type } });
                if (tyreId && tyreVehicleType) {
                    const updateVehicleType = yield this.tyreVehicleTypeRepository.update({
                        vehicle_type: createPropertyDto.vehicle_type,
                        vehicle_type_ua: createPropertyDto.vehicle_type_ua
                    }, { where: { id_vehicle_type: tyreVehicleType.id_vehicle_type } });
                    yield tyreId.$set('vehicle_type', updateVehicleType);
                    return updateVehicleType;
                }
                else {
                    const newTyreVehicleType = yield this.tyreVehicleTypeRepository.
                        create(createPropertyDto);
                    yield tyreId.$set('vehicle_type', newTyreVehicleType.id_vehicle_type);
                    return newTyreVehicleType;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreVehicleTypeFromPrice(id, id_vehicle_type, vehicle_type, vehicle_type_ua) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreVehicleType, created] = yield this.tyreVehicleTypeRepository.findOrCreate({ where: { vehicle_type: vehicle_type },
                    defaults: {
                        id_vehicle_type: id_vehicle_type,
                        vehicle_type: vehicle_type,
                        vehicle_type_ua: vehicle_type_ua
                    }
                });
                if (created || !created) {
                    yield tyreVehicleType.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreVehicleType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllVehicleType = yield this.tyreVehicleTypeRepository.findAll({ include: { all: true } });
                return tyreAllVehicleType;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreVehicleTypeById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleTypeId = yield this.tyreVehicleTypeRepository.findByPk(getPropertyDto.id_vehicle_type, { include: { all: true } });
                return vehicleTypeId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreVehicleType(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleTypeTyresId = yield this.tyreVehicleTypeRepository.findByPk(updatePropertyDto.id_vehicle_type, { include: { all: true } });
                if (vehicleTypeTyresId) {
                    const updateVehicleType = yield this.tyreVehicleTypeRepository.update({ vehicle_type: updatePropertyDto.vehicle_type,
                        vehicle_type_ua: updatePropertyDto.vehicle_type_ua
                    }, { where: { id_vehicle_type: updatePropertyDto.id_vehicle_type } });
                    return updateVehicleType;
                }
                return new HttpException(`Data "id_vehicle_type" or "vehicle_type" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreVehicleType(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeTyreVehicleTypes = yield this.tyreVehicleTypeRepository.destroy({ where: { id_vehicle_type: getPropertyDto.id_vehicle_type } });
                return removeTyreVehicleTypes;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreVehicleTypeService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreVehicleType)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreVehicleTypeService);
export { PropsTyreVehicleTypeService };
