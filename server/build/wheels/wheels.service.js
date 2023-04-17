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
import { Wheel } from './entities/wheel.model';
let WheelsService = class WheelsService {
    constructor(wheelRepository) {
        this.wheelRepository = wheelRepository;
    }
    createWheel(createWheelDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheel = yield this.wheelRepository.create(createWheelDto);
                return wheel;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createWheelFromPrice(id, full_name, full_name_color, full_name_hotline, photo_url, update_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [wheelsIdFromPrice, created] = yield this.wheelRepository.findOrCreate({ where: { id: id },
                    defaults: {
                        id: id,
                        full_name: full_name,
                        full_name_color: full_name_color,
                        full_name_hotline: full_name_hotline,
                        photo_url: photo_url,
                        update_date: update_date,
                    } });
                if (!created) {
                    yield wheelsIdFromPrice.update({
                        full_name: full_name,
                        full_name_color: full_name_color,
                        full_name_hotline: full_name_hotline,
                        update_date: update_date
                    }, { where: { id: wheelsIdFromPrice.id } });
                    return wheelsIdFromPrice;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllWheels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelsAll = yield this.wheelRepository.findAll({ include: { all: true } });
                return wheelsAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelById(getWheelDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelById = yield this.wheelRepository.findByPk(getWheelDto.id, { include: { all: true } });
                return wheelById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelOne(getWheelDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelById = yield this.wheelRepository.findOne({ where: { id: getWheelDto.id } });
                return wheelById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findWheelByIdPrice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelById = yield this.wheelRepository.findByPk(id, { include: { all: true } });
                return wheelById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateWheelDto) {
        return `This action updates a #${id} wheel`;
    }
    removeWheel(getWheelDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wheelRemove = yield this.wheelRepository.destroy({ where: { id: getWheelDto.id } });
                return wheelRemove;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
WheelsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Wheel)),
    __metadata("design:paramtypes", [Object])
], WheelsService);
export { WheelsService };
