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
import { TyreDemo } from '../entities/tyres/tyre-demo.model';
let PropsTyreDemoService = class PropsTyreDemoService {
    constructor(tyreDemoRepository, tyresService) {
        this.tyreDemoRepository = tyreDemoRepository;
        this.tyresService = tyresService;
    }
    createTyreDemo(createPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreId = yield this.tyresService.findTyresById(createPropertyDto);
                const tyreDemo = yield this.tyreDemoRepository.findOne({ where: { demo: createPropertyDto.demo } });
                if (tyreId && tyreDemo) {
                    const updateDemo = yield this.tyreDemoRepository.update({
                        demo: createPropertyDto.demo
                    }, { where: { id_demo: tyreDemo.id_demo } });
                    yield tyreId.$set('demo', updateDemo);
                    return updateDemo;
                }
                else if (tyreId && !tyreDemo) {
                    const newTyreDemo = yield this.tyreDemoRepository.create(createPropertyDto);
                    yield tyreId.$set('demo', newTyreDemo);
                    return newTyreDemo;
                }
                else {
                    const tyreDemo = yield this.tyreDemoRepository.create(createPropertyDto);
                    return tyreDemo;
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    createTyreDemoFromPrice(id, demo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tyreDemo, created] = yield this.tyreDemoRepository.findOrCreate({ where: { demo: demo }, defaults: { demo: demo } });
                if (created || !created) {
                    yield tyreDemo.$add('tyres', id);
                }
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllTyreDemo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyreAllDemo = yield this.tyreDemoRepository.findAll({ include: { all: true } });
                return tyreAllDemo;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findTyreDemoById(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brandId = yield this.tyreDemoRepository.findByPk(getPropertyDto.id_demo, { include: { all: true } });
                return brandId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    updateTyreDemo(updatePropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const demoTyresId = yield this.tyreDemoRepository.findByPk(updatePropertyDto.id_demo, { include: { all: true } });
                if (demoTyresId) {
                    const updateDemo = yield this.tyreDemoRepository.update({ demo: updatePropertyDto.demo }, { where: { id_demo: updatePropertyDto.id_demo } });
                    return updateDemo;
                }
                return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    removeTyreDemo(getPropertyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeDemoTyres = yield this.tyreDemoRepository.destroy({ where: { id_demo: getPropertyDto.id_demo } });
                return removeDemoTyres;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
PropsTyreDemoService = __decorate([
    Injectable(),
    __param(0, InjectModel(TyreDemo)),
    __metadata("design:paramtypes", [Object, TyresService])
], PropsTyreDemoService);
export { PropsTyreDemoService };
