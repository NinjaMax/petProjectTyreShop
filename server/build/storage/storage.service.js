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
import { Storage } from './entities/storage.model';
let StorageService = class StorageService {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    createStorage(createStorageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storage = yield this.storageRepository.create(createStorageDto);
                return storage;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageAll = yield this.storageRepository.findAll();
                return storageAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllStorageStock() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageAllStock = yield this.storageRepository.findAll({ where: { stock_tyres: { include: { all: true } },
                        stock_wheels: { include: { all: true } },
                        stock_batteries: { include: { all: true } },
                        stock_oils: { include: { all: true } } } });
                return storageAllStock;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStorageById(getStorageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageById = yield this.storageRepository.findByPk(getStorageDto.id_storage, { include: { all: true } });
                return storageById;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findStorageByIdOrder(getStorageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageByIdOrder = yield this.storageRepository.findByPk(getStorageDto.id_storage);
                return storageByIdOrder;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateStorageDto) {
        return `This action updates a #${id} storage`;
    }
    removeStorage(getStorageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageRemove = yield this.storageRepository.destroy({ where: { id_storage: getStorageDto.id_storage } });
                return storageRemove;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
StorageService = __decorate([
    Injectable(),
    __param(0, InjectModel(Storage)),
    __metadata("design:paramtypes", [Object])
], StorageService);
export { StorageService };
